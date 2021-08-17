import React from "react";
import {DataSet} from "vis";
import VisNetwork from "../components/Graph";
import {Button, Divider, Dropdown, Form, Grid, Tab} from "semantic-ui-react";
import functions from "../functions/Functions";
import PersonModal from "../components/PersonModal";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";


const TopicsByPerson: React.FC = observer(() => {

    const isMounted = React.useRef(true);

    const [nodes, setNode] = React.useState(new DataSet());
    const [edges, setEdge] = React.useState(new DataSet());
    const [selectedPerson, setSelectedPerson] = React.useState<string|null>("");
    const [selectedRelation, setSelectedRelation] = React.useState<string|null>("");
    const [selectedDb, setSelectedDb] = React.useState<string|null>("");

    const [personModal, setPersonModal] = React.useState(false);

    const [persons, setPersons] = React.useState<Array<any>>([]);
    const [relations, setRelations] = React.useState<Array<any>>([]);
    const [topics, setTopics] = React.useState<Array<any>>([]);
    const [events, setEvents] = React.useState<Array<any>>([]);


    const searchBoxChangeHandler= async (e:React.SyntheticEvent<HTMLElement,Event>)  => {
         setSelectedPerson(e.currentTarget.textContent);

         const person =  e.currentTarget.textContent;

         if(selectedRelation != "" && selectedDb != "") {

             const data_map =  await functions.getTopicsByPerson( person , selectedRelation, selectedDb);
             setNode(data_map.nodes);
             setEdge(data_map.edges);
         }

    }

    const relationBoxChangeHandler= async (e:React.SyntheticEvent<HTMLElement,Event>)  => {

        setSelectedRelation( e.currentTarget.textContent);

        const relation = e.currentTarget.textContent;

        if(selectedPerson != "" && selectedDb != "") {
            const data_map =  await functions.getTopicsByPerson( selectedPerson , relation, selectedDb);
            setNode(data_map.nodes);
            setEdge(data_map.edges);
        }
    }


    const dbChangeHandler= async (e:React.SyntheticEvent<HTMLElement,Event>)  => {

        setSelectedDb( e.currentTarget.textContent);

        const db = e.currentTarget.textContent;

        if(selectedPerson != "" && selectedRelation != "") {
            const data_map =  await functions.getTopicsByPerson( selectedPerson , selectedRelation, db);
            setNode(data_map.nodes);
            setEdge(data_map.edges);
        }
    }


    React.useEffect(() => {

        if(isMounted.current) {

        }

        let persons = toJS(nodeStore.persons);
        if(persons.length > 0) {
            setPersons(toJS(nodeStore.persons));
        }
        else {
            (async () => {
                await nodeStore.getPersons();
                setPersons(toJS(nodeStore.persons));
            })();
        }


        let relations = toJS(nodeStore.relations);
        if(relations.length > 0) {
            setRelations(toJS(nodeStore.relations));
        }
        else {
            (async () => {
                await nodeStore.getRelations();
                setRelations(toJS(nodeStore.relations));
            })();
        }

        let topics = toJS(nodeStore.topics);
        if(topics.length > 0) {
            setTopics(toJS(nodeStore.topics));
        }
        else {
            (async () => {
                await nodeStore.getTopics();
                setTopics(toJS(nodeStore.topics));
            })();
        }

        let events = toJS(nodeStore.events);
        if(events.length > 0) {
            setEvents(toJS(nodeStore.events));
        }
        else {
            (async () => {
                await nodeStore.getEvents();
                setEvents(toJS(nodeStore.events));
            })();
        }


        return () => { persons = []; events= []; topics =[]; relations= []; };

    },[]);

    const db_options = [
        {key: 1, value:"Topics",text:"Topics"},
        {key: 2, value:"Events",text:"Events"}]


    return (
        <>
            <Divider/>
            <Grid columns={3} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Person'
                            fluid
                            search
                            selection
                            selectOnNavigation={false}
                            onChange={searchBoxChangeHandler}
                            options={persons}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Relation'
                            fluid
                            search
                            selection
                            selectOnNavigation={false}
                            onChange={relationBoxChangeHandler}
                            options={relations}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select DB'
                            fluid
                            search
                            selection
                            selectOnNavigation={false}
                            onChange={dbChangeHandler}
                            options={db_options}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            {/*<Form onSubmit={onSubmit}>*/}
            {/*    <Form.Input placeholder='Search...' onChange={searchBoxChangeHandler}/>*/}
            {/*</Form>*/}
            <Divider/>
            <VisNetwork nodes={nodes} edges={edges}/>
        </>

    )
});


export default TopicsByPerson;



