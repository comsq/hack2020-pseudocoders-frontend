import { makeAutoObservable } from 'mobx';

export interface Language {
    name: string;
    slug: string;
    id: string;
}

const HOST_API = 'http://api.pseudocoders.online/api/';
// const commonBody = {
//     mode: 'cors',
//     headers: {
//         'Access-Control-Allow-Origin':'*'
//     }
// };

function getApi() {
    return {
        async loadLanguages() {
            const response = await fetch(`${HOST_API}languages/`, { method: 'get' });
            if (response.ok) {
                return response.json();
            }
        },

        async saveTask(data: any) {
            console.log(JSON.stringify(data));
            const response = await fetch(`${HOST_API}tasks/`, { method: 'post', body: JSON.stringify(data) });
            return response.status;
        },
    };
}

class CreateStoreClass {
    api = getApi();
    languages = [];
    saveProcess = false;
    saveStatus = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setLanguages(languages: any) {
        this.languages = languages;
    }

    async getLanguages() {
        const lang = await this.api.loadLanguages();
        this.setLanguages(lang);
    }

    async saveTask(data: any) {
        this.saveProcess = true;
        const status = await this.api.saveTask(data);
        this.saveProcess = false;
        this.saveStatus = status;
    }
}

export const CreateStore = new CreateStoreClass();
