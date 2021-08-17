import { observer } from 'mobx-react';
import React from 'react'
import {Button, Form, Icon, Input, Modal} from 'semantic-ui-react'
import goService from "../service/Neo4jService";
import Neo4jRequest from "../types/Neo4jRequest";
import nodeStore from "../store/NodeStore";


interface IEventModal {
    setOpenStatus: any
}


const EventModal:  (personModal: IEventModal) => JSX.Element = observer((personModal: IEventModal) =>{


    const [open, setOpen] = React.useState(true)
    const [eventFormValue, setEventFormValue] = React.useState<{ [x: string]: any }>({
        name: "", url: "",
        summary: "", images: "", priority: 0, like: 0
    });


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setEventFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const priorityChangeHandler = async (e: React.SyntheticEvent<HTMLElement, Event>) => {

        setEventFormValue(prevState => ({
            ...prevState,
            ["priority"]: e.currentTarget.textContent
        }));
    }


    const db_options = [
        {key: 1, value: 1, text: 1},
        {key: 2, value: 2, text: 2},
        {key: 3, value: 3, text: 3},
        {key: 4, value: 4, text: 4},
        {key: 5, value: 5, text: 5}
    ];

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
                <Modal.Header>Add Event</Modal.Header>
                <Modal.Content>
                    <Form>

                        <Form.Field>
                            <label>Event Name</label>
                            <Input placeholder='Event Name' name="name"
                                   value={eventFormValue.name} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Event Url</label>
                            <Input placeholder='Event Url' name="url"
                                   value={eventFormValue.url} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Event Summary</label>
                            <Input placeholder='Event Summary' name="summary"
                                   value={eventFormValue.summary} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Event Images</label>
                            <Input placeholder='Event Imges' name="images"
                                   value={eventFormValue.images} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Event Priority</label>

                            <Form.Select
                                placeholder='Select Topic'
                                fluid
                                selectOnNavigation={false}
                                onChange={priorityChangeHandler}
                                options={db_options}
                            />
                        </Form.Field>

                    </Form>


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
                        Object.assign(obj,
                            {
                                "cypher":
                                    " CREATE (e:Events{" +
                                    " name:'" + eventFormValue.name + "'," +
                                    " url: '" + eventFormValue.url + "'," +
                                    " summary: '" + eventFormValue.summary + "'," +
                                    " images: '" + eventFormValue.images + "' })" +
                                    " RETURN e",
                                "params": {},

                            });

                        await goService.createNode(obj);
                        await nodeStore.getTopics();
                    }}>
                        <Icon name='plus square'/> Add
                    </Button>

                </Modal.Actions>
            </Modal>
        </>

    )
})

export default EventModal