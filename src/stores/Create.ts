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

        async editTask(data: any, slug: string) {
            const response = await axios.put(`/api/tasks/update/${slug}/`, data);
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
        let status = 500;
        try {
            status = await this.api.saveTask(data);
        } catch {}
        this.saveStatus = status;
        this.saveProcess = false;

        return status;
    }

    async editTask(data: any, slug: string) {
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const status = await this.api.editTask(data, slug);
        return status;
    }
}

export const CreateStore = new CreateStoreClass();
