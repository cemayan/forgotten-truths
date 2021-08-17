import React from 'react'
import {Button, Dropdown, Grid, Icon, Input, Modal, Tab, TabProps} from 'semantic-ui-react'
import goService from "../service/Neo4jService";
import Neo4jRequest from "../types/Neo4jRequest";


interface IPersonMadal {
    setOpenStatus: any
    persons: any [],
    relations: any [],
    topics: any [],
    events: any []
}

const db_options = [
    {key: 1, value: "Topics", text: "Topics"},
    {key: 2, value: "Events", text: "Events"}]

function PersonModal(personModal: IPersonMadal) {

const [open, setOpen] = React.useState(true)
    const [formValue, setFormValue] = React.useState<{ [x: string]: string }>({Person: "", Relation: "", Db: "", Value: ""});
    const [selectedPerson, setSelectedPerson] = React.useState<string | null>("");
    const [selectedRelation, setSelectedRelation] = React.useState<string | null>("");
    const [selectedDb, setSelectedDb] = React.useState<string | null>("");
    const [selectedTab, setSelectedTab] = React.useState<number | string | undefined>(0);
    const [selectedValue, setSelectedValue] = React.useState<number | string | undefined>(0);

    const [persons, setPersons] = React.useState<Array<any>>(personModal.persons);
    const [relations, setRelations] = React.useState<Array<any>>(personModal.relations);
    const [values, setValues] = React.useState<Array<any>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const personChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
        setSelectedPerson(value);
    }

    const relationChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
        setSelectedRelation(e.currentTarget.textContent);
    }

    const dbChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {

        setValues([]);

        const selectedDb = e.currentTarget.textContent;
        setSelectedDb(selectedDb);

        if(selectedDb === "Topics") {
            setValues(personModal.topics);
        }
        else if(selectedDb === "Events") {
            setValues(personModal.events);
        }

    }

    const valueChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
        setSelectedValue(value);
    }

    const handleTabChange = (e: React.MouseEvent,data: TabProps)  => {
        setSelectedPerson(null);
        setSelectedRelation(null);
        setSelectedDb(null);

        setSelectedTab(data.activeIndex);
    }


    const panes = [
        {
            menuItem: 'Add Node for Existing Person',  render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>

                                <Dropdown
                                    placeholder='Select Person'
                                    fluid
                                    search
                                    selection
                                    name="Person"
                                    selectOnNavigation={false}
                                    onChange={personChangeHandler}
                                    options={persons}
                                />

                                {/*<Input fluid placeholder='Person' name="Person" value={formValue?.person} onChange={handleChange}  />*/}

                            </Grid.Column>
                            <Grid.Column floated={"right"}>

                                <Dropdown
                                    placeholder='Select Relation'
                                    fluid
                                    search
                                    selection
                                    name="Relation"
                                    selectOnNavigation={false}
                                    onChange={relationChangeHandler}
                                    options={relations}
                                />

                                {/*<Input fluid placeholder='Relation' name="Relation" value={formValue?.relation} onChange={handleChange}  />*/}
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column floated={"left"}>
                                <Dropdown
                                    placeholder='Select DB'
                                    fluid
                                    search
                                    selection
                                    name="Db"
                                    selectOnNavigation={false}
                                    onChange={dbChangeHandler}
                                    options={db_options}
                                />
                            </Grid.Column>
                            <Grid.Column floated={"right"}>
                                <Input fluid placeholder='Value' name="Value" value={formValue?.value}
                                       onChange={handleChange}/>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Tab.Pane>
        },
        {
            menuItem: 'Existing Node for Existing Person',  render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>

                                <Dropdown
                                    placeholder='Select Person'
                                    fluid
                                    search
                                    selection
                                    name="Person"
                                    selectOnNavigation={false}
                                    onChange={personChangeHandler}
                                    options={persons}
                                />

                                {/*<Input fluid placeholder='Person' name="Person" value={formValue?.person} onChange={handleChange}  />*/}

                            </Grid.Column>
                            <Grid.Column floated={"right"}>

                                <Dropdown
                                    placeholder='Select Relation'
                                    fluid
                                    search
                                    selection
                                    name="Relation"
                                    selectOnNavigation={false}
                                    onChange={relationChangeHandler}
                                    options={relations}
                                />

                                {/*<Input fluid placeholder='Relation' name="Relation" value={formValue?.relation} onChange={handleChange}  />*/}
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column floated={"left"}>
                                <Dropdown
                                    placeholder='Select DB'
                                    fluid
                                    search
                                    selection
                                    name="Db"
                                    selectOnNavigation={false}
                                    onChange={dbChangeHandler}
                                    options={db_options}
                                />
                            </Grid.Column>
                            <Grid.Column floated={"right"}>
                                <Dropdown
                                    placeholder='Select Event/Topic'
                                    fluid
                                    search
                                    selection
                                    name="TopicEvent"
                                    onChange={valueChangeHandler}
                                    selectOnNavigation={false}
                                    options={values}
                                />
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Tab.Pane>
        },
        {menuItem: 'Add Node for New Person', render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>

                                <Input fluid placeholder='Person' name="Person" value={formValue?.person} onChange={handleChange}  />

                            </Grid.Column>
                            <Grid.Column floated={"right"}>

                                <Dropdown
                                    placeholder='Select Relation'
                                    fluid
                                    search
                                    selection
                                    name="Relation"
                                    selectOnNavigation={false}
                                    onChange={relationChangeHandler}
                                    options={relations}
                                />
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column floated={"left"}>
                                <Dropdown
                                    placeholder='Select DB'
                                    fluid
                                    search
                                    selection
                                    name="Db"
                                    selectOnNavigation={false}
                                    onChange={dbChangeHandler}
                                    options={db_options}
                                />
                            </Grid.Column>
                            <Grid.Column floated={"right"}>
                                <Input fluid placeholder='Value' name="Value" value={formValue?.value}
                                       onChange={handleChange}/>
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Tab.Pane>},
        {menuItem: 'Existing Node for New Person', render: () =>
                <Tab.Pane>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column floated={"left"}>

                                <Input fluid placeholder='Person' name="Person" value={formValue?.person} onChange={handleChange}  />

                            </Grid.Column>
                            <Grid.Column floated={"right"}>

                                <Dropdown
                                    placeholder='Select Relation'
                                    fluid
                                    search
                                    selection
                                    name="Relation"
                                    selectOnNavigation={false}
                                    onChange={relationChangeHandler}
                                    options={values}
                                />
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column floated={"left"}>
                                <Dropdown
                                    placeholder='Select DB'
                                    fluid
                                    search
                                    selection
                                    name="Db"
                                    selectOnNavigation={false}
                                    onChange={dbChangeHandler}
                                    options={db_options}
                                />
                            </Grid.Column>
                            <Grid.Column floated={"right"}>
                                <Dropdown
                                    placeholder='Select Event/Topic'
                                    fluid
                                    search
                                    selection
                                    name="TopicEvent2"
                                    selectOnNavigation={false}
                                    onChange={valueChangeHandler}
                                    options={values}
                                />
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </Tab.Pane>}
    ]

    return (

        <>
            <Modal
                onClose={() => {
                    setOpen(false);
                    personModal.setOpenStatus(false);
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
                        personModal.setOpenStatus(false);
                    }}>
                        <Icon name='backward'/> Back
                    </Button>
                    <Button color='green' inverted onClick={async () => {
                        setOpen(false);
                        personModal.setOpenStatus(false);

                        const obj: Neo4jRequest = {}

                        if(selectedPerson != "" && selectedRelation != "" && selectedDb != "") {

                            if(selectedTab === 0) {
                                Object.assign(obj,
                                    {
                                        "cypher": "MATCH  (p:Persons)" +
                                            " WHERE  id(p)= $person" +
                                            " CREATE (p)-[r:" + selectedRelation + "]->(db:" + selectedDb + "{name:'" + formValue?.Value + "'})" +
                                            " RETURN p",
                                        "params": {
                                            "person": selectedPerson
                                        }
                                    });
                            }
                            if(selectedTab === 1) {

                                Object.assign(obj,
                                    {
                                        "cypher":
                                            " MATCH  (p:Persons)" +
                                            " MATCH  (db:"+ selectedDb +")" +
                                            " WHERE  id(p)= $person  AND id(db)= $value"  +
                                            " CREATE (p)-[r:" + selectedRelation + "]->(db)" +
                                            " RETURN p",
                                        "params": {
                                            "person": selectedPerson,
                                            "value": selectedValue
                                        }
                                    });
                            }
                            if(selectedTab === 2) {
                                Object.assign(obj,
                                    {
                                        "cypher": "CREATE (p:Person{name:"+ formValue?.Person +"})-[r:" + selectedRelation + "]->(db:" + selectedDb +
                                            "{name:'" + formValue?.Value + "'})" +
                                            " RETURN p",
                                        "params": {
                                        }
                                    });
                            }
                            if(selectedTab === 3) {
                                Object.assign(obj,
                                    {
                                        "cypher":
                                            " MATCH  (db:"+ selectedDb +")" +
                                            " WHERE  id(db)= $value"  +
                                            " CREATE (p:Person{name:"+ formValue?.Person +"})-[r:" + selectedRelation + "]->(db)" +
                                            " RETURN p",
                                        "params": {
                                            "value": selectedValue
                                        }
                                    });
                            }
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

export default PersonModal