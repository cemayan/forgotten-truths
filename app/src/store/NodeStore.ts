import {action, makeAutoObservable, observable, runInAction} from "mobx";
import functions from "../functions/Functions";

interface DropDownOption {
    key: string
    value: string,
    text: string
}


class NodeStore {
    @observable persons: DropDownOption[] ;
    @observable relations: DropDownOption[] ;
    @observable topics: DropDownOption[] ;
    @observable events: DropDownOption[] ;
    @observable news: Array<Record<string, any>> ;
    @observable years: Array<Record<string, any>> ;
    @observable usefulContents: Array<Record<string, any>> ;
    @observable allEvents: Array<Record<string, any>> ;

    constructor() {
        makeAutoObservable(this)
        this.events = [];
        this.persons = [];
        this.relations = [];
        this.topics = [];
        this.allEvents = [];
        this.news = [];
        this.years = [];
        this.usefulContents = [];
    }

    addList() {
        // this.list.push(obj);
    }

    @action getPersons = async () => {
        const [persons] = await Promise.all([functions.getPersons()])
        runInAction(() => {
            this.persons = persons;
        });
    }

    @action getRelations = async () => {
        const [relations] = await Promise.all([functions.getRelations()])
        runInAction(() => {
            this.relations = relations;
        });
    }

    @action getTopics = async () => {
        const [topics] = await Promise.all([functions.getTopics()])
        runInAction(() => {
            this.topics = topics;
        });
    }

    @action getEvents = async () => {
        const [events] = await Promise.all([functions.getEvents()])

        runInAction(() => {
            this.events = events;
        });
    }


    @action getNews = async () => {
        const [news] = await Promise.all([functions.getNews()])

        runInAction(() => {
            this.news = news;
        });
    }

    @action getYears = async () => {
        const [years] = await Promise.all([functions.getYears()])

        runInAction(() => {
            this.years = years;
        });
    }


    @action getUsefulContents = async () => {
        const [usefulContents] = await Promise.all([functions.getUsefulContents()])

        runInAction(() => {
            this.usefulContents = usefulContents;
        });
    }

    @action getAllEvents = async () => {
        const [allEvents] = await Promise.all([functions.getAllEvents()])

        runInAction(() => {
            this.allEvents = allEvents;
        });
    }

}

const nodeStore = new NodeStore();
export default nodeStore;
