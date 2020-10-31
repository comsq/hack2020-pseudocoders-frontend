import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import axios from 'axios';

function getApi() {
    return {
        async loadList() {
            const res = await axios.get<Task[]>('/api/tasks/');

            return res.data;
        },
    };
}

export type Task = {
    id: number;
    name: string;
    slug: string;
};
class TaskStoreClass {
    api = getApi();
    list = new WithLoadingFlags<Task[]>(this.api.loadList);
}

export const TaskStore = new TaskStoreClass();
