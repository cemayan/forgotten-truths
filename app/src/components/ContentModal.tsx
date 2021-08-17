import { observer } from 'mobx-react';
import React from 'react'
import {Button, Form, Icon, Input, Modal, TextArea} from 'semantic-ui-react'
import goService from "../service/Neo4jService";
import Neo4jRequest from "../types/Neo4jRequest";
import nodeStore from "../store/NodeStore";


interface IContentModal {
    setOpenStatus: any
}


const ContentModal:  (personModal: IContentModal) => JSX.Element = observer((contentModal: IContentModal) =>{


    const [open, setOpen] = React.useState(true)
    const [contentModalFormValue, setContentModalFormValue] = React.useState<{ [x: string]: any }>({
        name: "", author: "",
        text: "", url: "", authorImage: ""
    });


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setContentModalFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget
        setContentModalFormValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    return (

        <>
            <Modal
                onClose={() => {
                    setOpen(false);
                    contentModal.setOpenStatus(false);
                }}
                onOpen={async () => {
                    setOpen(true);
                }}
                open={open}>
                <Modal.Header>Add Useful Content</Modal.Header>
                <Modal.Content>
                    <Form>

                        <Form.Field>
                            <label>Content Name</label>
                            <Input placeholder='Content Name' name="name"
                                   value={contentModalFormValue.name} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Content Author</label>
                            <Input placeholder='Event Author' name="author"
                                   value={contentModalFormValue.author} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Content Author Image</label>
                            <Input placeholder='Content Author Image' name="authorImage"
                                   value={contentModalFormValue.authorImage} onChange={handleFormChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Content Text</label>
                            <TextArea label='About'  name="text" placeholder='Tell us more about you...' onChange={handleTextAreaChange}  />
                        </Form.Field>
                        <Form.Field>
                            <label>Content Url</label>
                            <Input placeholder='Content Url' name="url"
                                   value={contentModalFormValue.url} onChange={handleFormChange}/>
                        </Form.Field>


                    </Form>


                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={() => {
                        setOpen(false);
                        contentModal.setOpenStatus(false);
                    }}>
                        <Icon name='backward'/> Back
                    </Button>
                    <Button color='green' inverted onClick={async () => {
                        setOpen(false);
                        contentModal.setOpenStatus(false);

                        const obj: Neo4jRequest = {}
                        Object.assign(obj,
                            {
                                "cypher":
                                    " CREATE (u:UsefulContents{" +
                                    " name:'" + contentModalFormValue.name + "'," +
                                    " url: '" + contentModalFormValue.url + "'," +
                                    " text: '" + contentModalFormValue.text + "'," +
                                    " author: '" + contentModalFormValue.author + "'," +
                                    " authorImage:  '" + contentModalFormValue.authorImage + "'})" +
                                    " RETURN u",
                                "params": {}
                            });

                        await goService.createNode(obj);
                        await nodeStore.getUsefulContents();
                    }}>
                        <Icon name='plus square'/> Add
                    </Button>

                </Modal.Actions>
            </Modal>
        </>

    )
})

export default ContentModal