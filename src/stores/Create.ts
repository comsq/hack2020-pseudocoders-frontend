import axios from 'axios';
import slugify from 'slugify';
import { makeAutoObservable } from 'mobx';

export interface ILanguage {
    name: string;
    slug: string;
    id: string;
}

function getApi() {
    return {
        async loadLanguages() {
            const response = await axios.get<ILanguage[]>(`/api/languages/`);
            return response.data;
        },

        async saveTask(data: any) {
            const response = await axios.post(`/api/tasks/create/`, { ...data, slug: slugify(data.name) });
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

    reset() {
        this.api = getApi();
        this.languages = [];
        this.saveProcess = false;
        this.saveStatus = 0;
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
