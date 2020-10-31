import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import axios from 'axios';
import { IUser } from 'src/stores/User';

function getApi() {
    return {
        async loadList(): Promise<MonitorData[]> {
            const res = await axios.get<MonitorData[]>('api/task_checks/');
            return res.data.sort((md1, md2) => md2.date - md1.date);
        },
    };
}

export enum TaskStatus {
    running = 'running',
    stopped = 'stopped',
    ce = 'ce',
    re = 're',
    tle = 'tle',
    wa = 'wa',
    ok = 'ok',
}
type Language = {
    id: number;
    name: string;
    slug: string;
};
export type Task = {
    id: number;
    name: string;
    slug: string;
};
export type MonitorData = {
    date: number;
    id: number;
    language: Language;
    passed_tests_count: number;
    status: TaskStatus;
    task: Task;
    tests_count: number;
    user: Pick<IUser, 'id' | 'login' | 'last_name' | 'first_name'>;
};
class MonitorStoreClass {
    api = getApi();
    list = new WithLoadingFlags<MonitorData[]>(this.api.loadList);
}

export const MonitorStore = new MonitorStoreClass();
