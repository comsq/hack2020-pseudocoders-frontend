import axios from 'axios';
import { makeAutoObservable } from 'mobx';
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

    setCheckLogin() {
        this.checkLogin = true;
    }

    async login({ login, password }: { login: string; password: string }) {
        const user = await this.api.login({ login, password });
        this.setUser(user);
    }
}

export const UserUtils = {
    getFullName(user: SimpleUser) {
        return `${user.first_name} ${user.last_name}`;
    },
};

export const UserStore = new UserStoreClass();
