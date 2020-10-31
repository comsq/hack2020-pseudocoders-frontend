import axios from 'axios';
import { makeAutoObservable } from 'mobx';
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
};

export type SimpleUser = Pick<IUser, 'id' | 'login' | 'last_name' | 'first_name'>;

export type IEditor = {
    status: 'running' | 'exited';
    port?: number;
    isLoading?: boolean;
};

function getApi() {
    return {
        async login({ login, password }: { login: string; password: string }) {
            const res = await axios.post<IUser>('/api/login/', {
                login,
                password,
            });
            return res.data;
        },
        async loadList() {
            const res = await axios.get<IUser[]>('/api/users/');

            return res.data;
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

    constructor() {
        makeAutoObservable(this);
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
