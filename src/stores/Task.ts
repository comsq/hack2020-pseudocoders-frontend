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
    };
}

class TaskStoreClass {
    api = getApi();
    task: ITask | null = null;
    list = new WithLoadingFlags<ITask[]>(this.api.loadList);

    constructor() {
        makeAutoObservable(this);
    }

    async getTask(id: string) {
        const task = await this.api.loadTask(id);
        this.task = task;
    }
}

export const TaskStore = new TaskStoreClass();
