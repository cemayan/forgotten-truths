import {DataSet} from "vis";
import goService from "../service/Neo4jService";

const getPersons = async () => {

    const obj = {
        "cypher": "MATCH(p:Persons) RETURN p",
        "cacheValue":  "persons"
    }
    return await goService.getResults(obj);
}

const getYears = async () => {

    const obj = {
        "cypher": "MATCH(p:Years) RETURN p",
        "cacheValue":  "years"
    }
    return await goService.getResults(obj);
}


const getRelations = async () => {

    const obj = {
        "cypher": "MATCH (n)-[r]-(m) RETURN distinct type(r)",
        "cacheValue":  "relations"
    }

    return await goService.getResults(obj);
}


const getNews = async () => {

    const obj = {
        "cypher": "MATCH(n:News) RETURN n ORDER BY n.timestamp",
        "cacheValue":  "news"
    }

    return await goService.getResults(obj);
}

const getTopics = async () => {

    const obj = {
        "cypher": "MATCH(p:Topics) RETURN p",
        "cacheValue":  "topics"
    }

    return await goService.getResults(obj);
}


const getEvents = async () => {

    const obj = {
        "cypher": "MATCH(p:Events) RETURN p",
        "cacheValue":  "events"
    }

    return await goService.getResults(obj);
}

const getUsefulContents = async () => {

    const obj = {
        "cypher": "MATCH(p:UsefulContents) RETURN p",
        "cacheValue":  "usefulContents"
    }

    return await goService.getResults(obj);
}


const getNodesByPerson = async (keyword: string | null, relation: string | null, db: string | null) => {

    const obj = {
        "cypher": "MATCH p=(person:Persons)-[r:" + relation + "]->(e:"+ db +") WHERE person.name" +
            " CONTAINS $person RETURN p LIMIT 25",
        "params": {
            "person": keyword
        },
        "cacheValue":  "getNodesByPerson-"+ keyword + "-" + relation + "-" + db
    }
    return await goService.getResults(obj);
}

const getPersonsByTopic = async (keyword: string | null) => {
    const obj = {
        "cypher": "MATCH p=(topic:Topics)<-[r:RELATED_IN]-(persons:Persons) WHERE topic.name" +
            " CONTAINS $topic RETURN persons LIMIT 25",
        "params": {
            "topic": keyword
        },
        "cacheValue":  "getPersonsByTopic-"+ keyword
    }
    return await goService.getResults(obj);
}

const getEventsByYear = async (keyword: number | null) => {
    const obj = {
        "cypher": "MATCH p=(year:Years)-[r:HAPPENED_ON]->(event:Events) WHERE year.name = $year RETURN event LIMIT 25",
        "params": {
            "year": keyword
        },
        "type":  "getEventsByYear-" + keyword
    }
    return await goService.getResults(obj);
}


const nodes: DataSet<any> = new DataSet<any>();
let edges: DataSet<any> = new DataSet<any>();


const functions = {
    getRelations: async () => {


        const persons: Array<any> = await getRelations();
        const arr: Array<any> = [];

        persons.forEach((data) => {
            arr.push({key: data, value: data, text: data});
        });


        return arr;
    },
    getYears: async () => {


        const years: Array<any> = await getYears();
        const arr: Array<any> = [];

        years.forEach((data) => {
            arr.push({key: data.Id, value: data.Id, text: data.Props.name});
        });


        return arr;
    },
    getUsefulContents: async () => {


        const usefulContents: Array<any> = await getUsefulContents();
        const arr: Array<any> = [];

        usefulContents.forEach((data) => {
            arr.push(data);
        });


        return arr.sort(() => Math.random() - 0.5);
    },
    getPersons: async () => {

        const persons: Array<any> = await getPersons();
        const arr: Array<any> = [];

        persons.forEach((data) => {
            arr.push({key: data.Id, value: data.Id, text: data.Props.name});
        });


        return arr;
    },
    getTopics: async () => {
        const persons: Array<any> = await getTopics();
        const arr: Array<any> = [];

        persons.forEach((data) => {
            arr.push({key: data.Id, value: data.Id, text: data.Props.name});
        });


        return arr;
    },
    getEvents: async () => {
        const events: Array<any> = await getEvents();
        const arr: Array<any> = [];

        events.forEach((data) => {
            arr.push({key: data.Id, value: data.Id, text: data.Props.name});
        });


        return arr.sort(() => Math.random() - 0.5);
    },
    getNews: async () => {
        const news: Array<any> = await getNews();
        const arr: Array<any> = [];

        news.forEach((data) => {
            arr.push(data);
        });


        return  arr;
    },
    getAllEvents: async () => {
       return  await getEvents();
    },
    getTopicsByPerson: async (keyword: string | null, relation: string | null, db: string | null) => {

        nodes.clear();
        edges.clear();


        const topics: Array<any> = await getNodesByPerson(keyword, relation, db);
        const arr: Array<any> = []

        if (topics) {
            topics.forEach((data) => {

                const nodes_ = data.Nodes;
                const relations_ = data.Relationships;


                const topic = nodes_[0];
                const relatedin = nodes_[1];

                const relation = relations_[0];

                if (nodes.getIds().findIndex(x => x === relatedin.Id) < 0) {
                    nodes.add({id: relatedin.Id, label: relatedin.Props.name, shape: 'circle', color: "#6E6EFD"})
                }

                if (nodes.getIds().findIndex(x => x === topic.Id) < 0) {
                    nodes.add({id: topic.Id, label: topic.Props.name, shape: 'circle'})
                }

                arr.push({from: relation.StartId, to: relation.EndId});
            });
        }


        edges = new DataSet(arr);

        return {nodes: nodes, edges: edges};
    },
    getPersonsByTopic: async (keyword: string | null) => {

        nodes.clear();
        edges.clear();

        const topics: Array<any> = await getPersonsByTopic(keyword);
        const arr: Array<any> = []


        if (topics) {
            topics.forEach((data) => {
                nodes.add({id: data.Id, label: data.Props.name, shape: 'circle', color: "#6E6EFD"})
            });
        }

        return {nodes: nodes};
    },
    getEventsByyear: async (keyword: number | null) => {

        nodes.clear();

        const topics: Array<any> = await getEventsByYear(keyword);
        const arr: Array<any> = []


        if (topics) {
            topics.forEach((data) => {
                nodes.add({id: data.Id, label: data.Props.name, shape: 'circle', color: "#6E6EFD"})
            });
        }

        return {nodes: nodes};
    }
}

export default functions;