import { makeAutoObservable } from 'mobx';
import { Language } from './Create';
import axios from 'axios';

interface IAuthor {
    id: string;
    login: string;
    last_name: string;
    first_name: string;
}

interface ITest {
    input: string;
    output: string;
}

export type ITask = {
    id: string;
    author: IAuthor;
    languages: Language[];
    name: string;
    description: string;
    slug: string;
    tests: ITest[];
};

function getApi() {
    return {
        async loadTask(slug: string) {
            const response = await axios.get<ITask>(`/api/tasks/${slug}`);
            return response.data;
        },
    };
}

class TaskStoreClass {
    api = getApi();
    task: ITask | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getTask(id: string) {
        const task = await this.api.loadTask(id);
        this.task = task;
    }
}

export const TaskStore = new TaskStoreClass();
