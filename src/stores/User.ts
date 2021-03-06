import axios from 'axios';
import { computed, makeAutoObservable } from 'mobx';
import { AsyncHelper } from 'src/helpers/AsyncHelper';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';
import { WithLoadingFlags } from 'src/helpers/StoreHelper';

export enum UserType {
    student = 'student',
    teacher = 'teacher',
}

export type IUser = {
    id: number;
    login: string;
    first_name: string;
    last_name: string;
    email: string;
    type: UserType;
    isTeacher: boolean;
    isStudent: boolean;
};

type IUserFromApi = {
    id: number;
    login: string;
    first_name: string;
    last_name: string;
    email: string;
} & (
    | {
          user_type: UserType;
      }
    | { type: UserType }
);

export type SimpleUser = Pick<IUser, 'id' | 'login' | 'last_name' | 'first_name'>;

export type IEditor = {
    status: 'running' | 'exited';
    port?: number;
    isLoading?: boolean;
};

function deserializeUser(user: IUserFromApi): IUser {
    const type = ('user_type' in user && user.user_type) || (('type' in user && user.type) as UserType);
    return {
        ...user,
        isTeacher: type === UserType.teacher,
        isStudent: type === UserType.student,
        type,
    };
}
function getApi() {
    return {
        async login({ login, password }: { login: string; password: string }) {
            const res = await axios.post<IUserFromApi>('/api/login/', {
                login,
                password,
            });
            return deserializeUser(res.data);
        },
        async loadList() {
            const res = await axios.get<IUserFromApi[]>('/api/users/');

            return res.data.map((user) => deserializeUser(user));
        },

        async editorStatus(userId: number) {
            const res = await axios.get<IEditor>(`/tasks/editor/${userId}/status/`);

            return res.data;
        },

        async startEditor(userId: number) {
            await axios.post(`/tasks/editor/${userId}/start/`);

            let res: IEditor = await this.editorStatus(userId);
            while (res?.status !== 'running') {
                await AsyncHelper.delay(1000);
                res = await this.editorStatus(userId);
            }

            return res;
        },

        async stopEditor(userId: number) {
            await axios.post(`/tasks/editor/${userId}/stop/`);

            let res: IEditor = await this.editorStatus(userId);
            while (res?.status !== 'exited') {
                await AsyncHelper.delay(1000);
                res = await this.editorStatus(userId);
            }

            return res;
        },
    };
}

class UserStoreClass {
    api = getApi();
    checkLogin = false;
    user: IUser | null = null;
    editor: IEditor | null = null;

    list = new WithLoadingFlags<IUser[]>(this.api.loadList);
    @computed get teachers() {
        return this.list.data?.filter((user) => user.isTeacher);
    }

    @computed get students() {
        return this.list.data?.filter((user) => user.isStudent);
    }

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.api = getApi();
        this.checkLogin = false;
        this.user = null;
        this.editor = null;
        this.list = new WithLoadingFlags<IUser[]>(this.api.loadList);
    }

    setUser(user: IUser | null) {
        this.user = user;
        LocalStorageSafe.setItem('user', this.user);
    }

    setEditor(editor: IEditor | null) {
        this.editor = editor;
    }

    setCheckLogin() {
        this.checkLogin = true;
    }

    async login({ login, password }: { login: string; password: string }) {
        const user = await this.api.login({ login, password });
        this.setUser(user);
    }

    async editorStatus(userId: number) {
        const editor = await this.api.editorStatus(userId);
        this.setEditor(editor);
    }

    async startEditor(userId: number) {
        if (this.editor) {
            this.setEditor({ ...this.editor, isLoading: true });
        }

        const editor = await this.api.startEditor(userId);
        this.setEditor(editor);
    }

    async stopEditor(userId: number) {
        if (this.editor) {
            this.setEditor({ ...this.editor, isLoading: true });
        }

        const editor = await this.api.stopEditor(userId);
        this.setEditor(editor);
    }
}

export const UserUtils = {
    getFullName(user: SimpleUser) {
        return `${user.first_name} ${user.last_name}`;
    },
};

export const UserStore = new UserStoreClass();
