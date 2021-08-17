import React from 'react'
import {Button, Dropdown, Grid, Icon, Input, Modal, Tab, TabProps} from 'semantic-ui-react'
import goService from "../service/Neo4jService";
import Neo4jRequest from "../types/Neo4jRequest";
import * as events from "events";


interface IYearModal {
    setOpenStatus: any
    events: any []
    years: any[]
}



function YearModal(yearModal: IYearModal) {

    const [open, setOpen] = React.useState(true)
    const [formValue, setFormValue] = React.useState<{ [x: string]: string }>({value: ""});
    const [selectedTab, setSelectedTab] = React.useState<number | string | undefined>(0);
    const [selectedYear, setSelectedYear] = React.useState<number | null>(0);
    const [selectedEvent, setSelectedEvent] = React.useState<number | null>(0);


    const [years, setYears] = React.useState<Array<any>>(yearModal.years);
    const [events, setEvents] = React.useState<Array<any>>(yearModal.events);

    const yearChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
        setSelectedYear(value);
    }

    const eventChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
        setSelectedEvent(value);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleTabChange = (e: React.MouseEvent,data: TabProps)  => {
        setSelectedTab(data.activeIndex);
    }


    const panes = [
        {
            menuItem: 'Add Node for Existing Event',  render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>

                                <Dropdown
                                    placeholder='Select Year'
                                    fluid
                                    search
                                    selection
                                    name="year"
                                    selectOnNavigation={false}
                                    onChange={yearChangeHandler}
                                    options={years}
                                />

                            </Grid.Column>
                            <Grid.Column floated={"right"}>

                                <Dropdown
                                    placeholder='Select Event'
                                    fluid
                                    search
                                    selection
                                    name="event"
                                    onChange={eventChangeHandler}
                                    options={events}
                                />

                            </Grid.Column>

                        </Grid.Row>


                    </Grid>
                </Tab.Pane>
        },
        {
            menuItem: 'And Node for New Event',  render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>
                                <Dropdown
                                    placeholder='Select Year'
                                    fluid
                                    search
                                    selection
                                    name="year"
                                    selectOnNavigation={false}
                                    onChange={yearChangeHandler}
                                    options={years}
                                />

                            </Grid.Column>
                            <Grid.Column floated={"right"}>
                                <Input fluid placeholder='Event' name="Event" value={formValue?.relation} onChange={handleChange}  />
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Tab.Pane>
        }
    ]

    return (

        <>
            <Modal
                onClose={() => {
                    setOpen(false);
                    yearModal.setOpenStatus(false);
                }}
                onOpen={async () => {
                    setOpen(true);
                }}
                open={open}>
                <Modal.Header>Add  Node</Modal.Header>
                <Modal.Content>
                    <Tab panes={panes}  onTabChange={handleTabChange}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={() => {
                        setOpen(false);
                        yearModal.setOpenStatus(false);
                    }}>
                        <Icon name='backward'/> Back
                    </Button>
                    <Button color='green' inverted onClick={async () => {
                        setOpen(false);
                        yearModal.setOpenStatus(false);

                        const obj: Neo4jRequest = {}


                        if(selectedTab === 0) {
                            Object.assign(obj,
                                {
                                    "cypher":
                                        " MATCH  (y:Years)" +
                                        " MATCH  (e:Events)" +
                                        " WHERE  id(y)=$year  AND id(e)=$event"  +
                                        " CREATE (y)-[r:HAPPENED_ON]->(e)" +
                                        " RETURN y",
                                    "params": {
                                        "year": selectedYear,
                                        "event": selectedEvent
                                    }
                                });
                        }
                        if(selectedTab === 1) {
                            Object.assign(obj,
                                {
                                    "cypher":
                                        " MATCH  (y:Years)" +
                                        " WHERE  id(y)=$year"  +
                                        " CREATE (y)-[r:HAPPENED_ON]->(e:Events{name:"+ formValue?.value +"})" +
                                        " RETURN y",
                                    "params": {
                                        "year": selectedYear
                                    }
                                });
                        }

                        console.log(obj);

                        await goService.createNode(obj);

                    }}>
                        <Icon name='plus square'/> Add
                    </Button>
                </Modal.Actions>
            </Modal>
        </>

    )
}

export default YearModal