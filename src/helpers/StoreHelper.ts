import { makeAutoObservable } from 'mobx';

export class WithLoadingFlags<Result = unknown> {
    isLoading = true;
    isLoaded = false;
    hasError = false;
    isConsumerInitialized = false;
    updateTimeoutId: number | null = null;
    interval = 3000;
    // @ts-ignore
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

    async loadWithSavingState() {
        try {
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

    async addConsumer() {
        if (this.isConsumerInitialized) {
            return;
        }

        await this.tick(this.loadWithSavingState.bind(this));
    }

    removeConsumer() {
        this.isConsumerInitialized = false;
        this.updateTimeoutId && window.clearTimeout(this.updateTimeoutId);
    }

    async tick(func: () => void) {
        await func();

        this.updateTimeoutId && window.clearTimeout(this.updateTimeoutId);

        this.updateTimeoutId = window.setTimeout(() => this.tick(func), this.interval);
    }
}
