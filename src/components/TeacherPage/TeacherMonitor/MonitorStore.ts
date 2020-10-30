import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import { AsyncHelper } from 'src/helpers/AsyncHelper';

function getApi() {
    return {
        async loadList(): Promise<MonitorData[]> {
            await AsyncHelper.delay(1000);
            return [
                {
                    student_id: 2,
                    task_id: '2',
                    status: TaskStatus.ok,
                    id: '1',
                    passed_tests_count: 10,
                    test_count: 10,
                    date: 1604090908,
                    language: 'Python 3',
                },
                {
                    student_id: 1,
                    task_id: '2',
                    status: TaskStatus.wa,
                    id: '2',
                    passed_tests_count: 0,
                    test_count: 10,
                    date: 1604090808,
                    language: 'C++',
                },
            ].map((monitorData) => ({
                ...monitorData,
                date: monitorData.date * 1000,
            }));
        },
    };
}

enum TaskStatus {
    running = 'running',
    stopped = 'stopped',
    ce = 'ce',
    re = 're',
    tle = 'tle',
    wa = 'wa',
    ok = 'ok',
}
export type MonitorData = {
    id: string;
    student_id: number;
    task_id: string;
    status: TaskStatus;
    test_count: number;
    passed_tests_count: number;
    language: string;
    date: number;
};
class MonitorStoreClass {
    api = getApi();
    list = new WithLoadingFlags<MonitorData[]>(this.api.loadList);
}

export const MonitorStore = new MonitorStoreClass();
