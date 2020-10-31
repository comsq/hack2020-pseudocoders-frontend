import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import axios from 'axios';
import { SimpleUser, UserStore } from 'src/stores/User';
import { SimpleTask } from 'src/stores/Task';

function getApi() {
    return {
        async loadList(): Promise<MonitorData[]> {
            const userId = UserStore.user?.id;
            if (!userId) {
                return [];
            }
            const res = await axios.get<MonitorData[]>(`api/users/${userId}/task_checks/`);
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

export type MonitorData = {
    date: number;
    id: number;
    language: Language;
    passed_tests_count: number;
    status: TaskStatus;
    task: SimpleTask;
    task_author: SimpleUser;
    tests_count: number;
    user: SimpleUser;
};
class MonitorStoreClass {
    api = getApi();
    list = new WithLoadingFlags<MonitorData[]>(this.api.loadList);

    reset() {
        this.api = getApi();
        this.list = new WithLoadingFlags<MonitorData[]>(this.api.loadList);
    }
}

export const MonitorStore = new MonitorStoreClass();
