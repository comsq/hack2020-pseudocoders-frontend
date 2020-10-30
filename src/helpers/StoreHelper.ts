import { makeAutoObservable } from 'mobx';

export class WithLoadingFlags<Result = unknown> {
    isLoading = true;
    isLoaded = false;
    hasError = false;
    data: Result;
    action: () => Promise<Result>;

    constructor(action: () => Promise<Result>) {
        this.action = action;
        makeAutoObservable(this);
    }

    async load() {
        try {
            this.isLoading = true;
            this.data = await this.action();
            this.hasError = false;
        } catch (error) {
            console.error(error);
            this.hasError = true;
        } finally {
            this.isLoaded = true;
            this.isLoading = false;
        }
    }

    loadIfNotLoaded() {
        if (!this.isLoaded) {
            this.load();
        }
    }
}
