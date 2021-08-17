import React, {useEffect} from "react";
import {DataSet} from "vis";
import VisNetwork from "../components/Graph";
import {Divider, Dropdown, Form} from "semantic-ui-react";
import functions from "../functions/Functions";
import {observer} from "mobx-react";
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";


const PersonsByTopic: React.FC =  observer(() => {


    const [nodes, setNode] = React.useState(new DataSet());
    const [edges, setEdge] = React.useState(new DataSet());
    const [topics, setTopics] = React.useState<Array<any>>([]);


    const searchBoxChangeHandler= async (e:React.SyntheticEvent<HTMLElement,Event>)  => {
         setNode(new DataSet());

         const data_map =  await functions.getPersonsByTopic(e.currentTarget.textContent);
         setNode(data_map.nodes);
    }


    React.useEffect( () => {

        const topics = toJS(nodeStore.topics);
        if(topics.length > 0) {
            setTopics(toJS(nodeStore.topics));
        }
        else {

            (async () => {
                 await nodeStore.getTopics();
                 setTopics(nodeStore.topics);
            })();
        }
    }, []);

    return (
        <>
            <Divider/>
            <Dropdown
                placeholder='Select Topic'
                fluid
                search
                selection
                selectOnNavigation={false}
                onChange={searchBoxChangeHandler}
                options={topics}
            />
            {/*<Form onSubmit={onSubmit}>*/}
            {/*    <Form.Input placeholder='Search...' onChange={searchBoxChangeHandler}/>*/}
            {/*</Form>*/}
            <Divider/>
            <VisNetwork nodes={nodes} edges={edges}/>
        </>

    )
})


export default PersonsByTopic;



