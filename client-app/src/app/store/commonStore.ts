import { action, observable } from 'mobx';
import {RootStore } from './rootStore'

export default class CommonStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable token: string| null = null;
    @observable appLoades = false;

    @action setToken =(token : string | null) => {
        window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoades = true;
    }
}