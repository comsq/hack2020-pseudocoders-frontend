import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import { AsyncHelper } from 'src/helpers/AsyncHelper';

function getApi() {
    return {
        async loadList() {
            await AsyncHelper.delay(1000);
            return [
                {
                    name: 'Курс по PHP',
                    description: 'php ето не сила',
                },
                {
                    name: 'Курс по JS',
                    description: 'js ето сила',
                },
                {
                    name: 'Курс по C',
                    description: 'C ето немножко сила',
                },
            ];
        },
    };
}

type Course = {
    name: string;
    description: string;
};
class CoursesStoreClass {
    api = getApi();
    list = new WithLoadingFlags<Course[]>(this.api.loadList);
}

export const CoursesStore = new CoursesStoreClass();
