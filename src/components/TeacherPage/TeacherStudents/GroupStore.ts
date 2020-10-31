import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import axios from 'axios';
import { Task } from '../TeacherMonitor/MonitorStore';

function getApi() {
    return {
        async loadList() {
            const res = await axios.get<Group[]>('api/groups/');
            return res.data;
        },
    };
}

export type Group = {
    id: number;
    name: string;
    owner: number;
    slug: string;
    tasks: Task[];
};
class GroupStoreClass {
    api = getApi();
    list = new WithLoadingFlags(this.api.loadList);
}

export const GroupStore = new GroupStoreClass();
