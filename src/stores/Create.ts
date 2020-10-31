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

type Create = {
    name: string;
    description: string;
};
class CreateStoreClass {
    api = getApi();
    list = new WithLoadingFlags<Create[]>(this.api.loadList);
}

export const CreateStore = new CreateStoreClass();
