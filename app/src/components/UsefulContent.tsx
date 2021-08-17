import React from 'react'
import {Card, Icon, Image, List} from "semantic-ui-react";
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";

const UsefulContent = () => {

    const [usefulContents, setUsefulContents] = React.useState<Array<any>>([]);

    const forwardToNews = (url :string)  => {
        window.open(url);
    }

    React.useEffect(() => {

        const usefulContents = toJS(nodeStore.usefulContents);
        if (usefulContents.length > 0) {
            setUsefulContents(toJS(nodeStore.usefulContents));
        } else {
            (async () => {
                await nodeStore.getUsefulContents();

                console.log(toJS(nodeStore.usefulContents))
                setUsefulContents(toJS(nodeStore.usefulContents));
            })();
        }

    }, []);


    return (
        <List celled style={{overflow: 'auto', maxHeight: 400}}>

            {usefulContents.map((data) => {
                return(
                    <List.Item key={data.Id} onClick={() =>forwardToNews(data.Props.url) }>
                        {data.Props.authorImage === "" ?   <Icon name='user'/> :
                            <Image
                                size='mini'
                                avatar
                                src={data.Props.authorImage}
                            />
                        }

                        <List.Content>
                            <List.Header>
                                { data.Props.name}
                            </List.Header>
                            { data.Props.author}
                        </List.Content>
                    </List.Item>
                    )
            })}
        </List>
    )
}


export default UsefulContent
