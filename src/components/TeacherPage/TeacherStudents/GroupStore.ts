import { WithLoadingFlags } from 'src/helpers/StoreHelper';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';

type CreateGroupData = Omit<Group, 'id'>;
type EditGroupData = Partial<Omit<Group, 'id'>>;

function getApi() {
    return {
        async loadList() {
            const res = await axios.get<Group[]>('api/groups/');
            return res.data;
        },
        async createGroup(data: CreateGroupData) {
            const res = await axios.post('api/groups/', data);
            return res.data;
        },
        async editGroup(id: number, data: EditGroupData) {
            const res = await axios.patch(`api/groups/${id}/`, data);
            return res.data;
        },
    };
}

export type Group = {
    id: number;
    name: string;
    owner: number;
    slug: string;
    tasks: number[];
    users: number[];
};
class GroupStoreClass {
    api = getApi();
    list = new WithLoadingFlags(this.api.loadList);
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    reset() {
        this.api = getApi();
        this.list = new WithLoadingFlags(this.api.loadList);
        this.isLoading = false;
    }

    async createGroup(data: CreateGroupData) {
        this.isLoading = true;
        const group = await this.api.createGroup(data);
        await this.list.loadWithSavingState();
        this.isLoading = false;
        return group;
    }

    async editGroup(id: number, data: EditGroupData) {
        this.isLoading = true;
        const group = await this.api.editGroup(id, data);
        await this.list.loadWithSavingState();
        this.isLoading = false;
        return group;
    }
}

export const GroupStore = new GroupStoreClass();
