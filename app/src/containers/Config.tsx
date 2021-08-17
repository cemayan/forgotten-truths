import React from 'react';
import {observer} from "mobx-react";
import {Button, Divider, Grid, Label, Segment} from "semantic-ui-react";
import PersonModal from "../components/PersonModal";
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";
import EventModal from "../components/EventModal";
import ContentModal from "../components/ContentModal";
import YearModal from "../components/YearModal";


const Config = observer(() => {

    const [persons, setPersons] = React.useState<Array<any>>([]);
    const [relations, setRelations] = React.useState<Array<any>>([]);
    const [topics, setTopics] = React.useState<Array<any>>([]);
    const [events, setEvents] = React.useState<Array<any>>([]);
    const [years, setYears] = React.useState<Array<any>>([]);

    const [personModal, setPersonModal] = React.useState(false);
    const [eventModal, setEventModal] = React.useState(false);
    const [contentModal, setContentModal] = React.useState(false);
    const [yearModal, setYearModal] = React.useState(false);


    const mountedRef = React.useRef(true)


    React.useEffect(() => {

        let unmounted = false;


        const persons = toJS(nodeStore.persons);
        if (persons.length > 0) {
            if (!unmounted) {
                setPersons(toJS(nodeStore.persons));
            }
        } else {
            (async () => {
                if (!unmounted) {
                    await nodeStore.getPersons();
                    setPersons(toJS(nodeStore.persons));
                }
            })();
        }

        const years = toJS(nodeStore.years);
        if (years.length > 0) {
            if (!unmounted) {
                setYears(toJS(nodeStore.years));
            }
        } else {
            (async () => {
                if (!unmounted) {
                    await nodeStore.getYears();
                    setYears(toJS(nodeStore.years));
                }
            })();
        }


        const relations = toJS(nodeStore.relations);
        if (relations.length > 0) {
            if (!unmounted) {
                setRelations(toJS(nodeStore.relations));
            }
        } else {
            (async () => {
                if (!unmounted) {
                    await nodeStore.getRelations();
                    setRelations(toJS(nodeStore.relations));
                }
            })();
        }

        const topics = toJS(nodeStore.topics);
        if (topics.length > 0) {
            if (!unmounted) {
                setTopics(toJS(nodeStore.topics));
            }
        } else {
            (async () => {
                if (!unmounted) {
                    await nodeStore.getTopics();

                    setTopics(toJS(nodeStore.topics));
                }
            })();
        }

        const events = toJS(nodeStore.events);
        if (events.length > 0) {
            if (!unmounted) {
                setEvents(toJS(nodeStore.events));
            }
        } else {
            (async () => {
                if (!unmounted) {
                    await nodeStore.getEvents();

                    setEvents(toJS(nodeStore.events));
                }
            })();
        }


        return () => {
            unmounted = true
        };

    }, []);


    return (

        <>

            {personModal ? <PersonModal setOpenStatus={setPersonModal}
                                        persons={persons} relations={relations}
                                        topics={topics} events={events}/> : <></>}
            {eventModal ? <EventModal setOpenStatus={setEventModal}/> : <></>}
            {contentModal ? <ContentModal setOpenStatus={setContentModal}/> : <></>}
            {yearModal ? <YearModal setOpenStatus={setYearModal} events={events} years={years}/> : <></>}


            <Segment inverted color='yellow' tertiary>
                <Button color="yellow" onClick={() => setPersonModal(true)}>Add Node</Button>
            </Segment>
            <Segment inverted color='teal' tertiary>
                <Button color="teal" onClick={() => setYearModal(true)}>Add Topic By Year</Button>
            </Segment>
            <Segment inverted color='yellow' tertiary>
                <Button color="orange" onClick={() => setEventModal(true)}>Add Event</Button> </Segment>
            <Segment inverted color='red' tertiary>
                <Button color="red" onClick={() => setContentModal(true)}>Add Content</Button> </Segment>

        </>
    )
})

export default Config;
