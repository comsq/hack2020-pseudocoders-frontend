import { makeAutoObservable } from 'mobx';
import { ILanguage } from './Create';
import axios from 'axios';
import { WithLoadingFlags } from 'src/helpers/StoreHelper';

interface IAuthor {
    id: number;
    login: string;
    last_name: string;
    first_name: string;
}

interface ITest {
    input: string;
    output: string;
}

export type ITask = {
    id: number;
    author: IAuthor;
    languages: ILanguage[];
    name: string;
    description: string;
    slug: string;
    tests: ITest[];
    verdict?: string;
};

export type SimpleTask = Pick<ITask, 'id' | 'name' | 'slug'>;

function getApi() {
    return {
        async loadTask(slug: string) {
            const response = await axios.get<ITask>(`/api/tasks/${slug}`);
            return response.data;
        },
        async loadList() {
            const res = await axios.get<ITask[]>('/api/tasks/');

            return res.data;
        },
        async loadListByUser(user_id: number) {
            const res = await axios.get<ITask[]>(`/api/users/${user_id}/tasks/`);

            return res.data;
        },
        async sendTask(userId: string, taskId: string, lang: string) {
            await axios.post<ITask[]>(`/tasks/verify/user/${userId}/task/${taskId}/language/${lang}`);
        },
    };
}

class TaskStoreClass {
    api = getApi();
    task: ITask | null = null;
    listUser: ITask[] | null = null;
    list = new WithLoadingFlags<ITask[]>(this.api.loadList);

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.api = getApi();
        this.task = null;
        this.listUser = null;
        this.list = new WithLoadingFlags<ITask[]>(this.api.loadList);
    }

    async getTask(id: string) {
        const task = await this.api.loadTask(id);
        this.task = task;
    }

    async getListByUser(user_id: number) {
        const listUser = await this.api.loadListByUser(user_id);
        this.list.isLoading = false;
        this.listUser = listUser;
    }

    async sendTask(userId: string, taskId: string, lang: string) {
        await this.api.sendTask(userId, taskId, lang);
    }

    resetTask() {
        this.task = null;
    }
}

export const TaskStore = new TaskStoreClass();
