import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { LocalStorageSafe } from 'src/helpers/LocalStorageSafe';

export enum UserType {
    student = 'student',
    teacher = 'teacher',
}
export type IUser = {
    id: string;
    login: string;
    first_name: string;
    last_name: string;
    email: string;
    type: UserType;
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
    };
}

class UserStoreClass {
    api = getApi();
    checkLogin = false;
    user: IUser | null = null;

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

export const UserStore = new UserStoreClass();
