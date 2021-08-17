import React from 'react'
import {Card, Feed, Icon, Image, List} from 'semantic-ui-react'
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";

const Agenda = () => {

    const [news, setNews] = React.useState<Array<any>>([]);

    const forwardToNews = (url :string)  => {
        window.open("https://birgun.net" +  url);
    }

    React.useEffect(() => {

        const news = toJS(nodeStore.news);
        if (news.length > 0) {
            setNews(toJS(nodeStore.news));
        } else {
            (async () => {
                await nodeStore.getNews();
                setNews(toJS(nodeStore.news));
            })();
        }

    }, []);

    return (

            <Card.Group style={{overflow: 'auto', maxHeight: 400}}>

                {news.map((data) => {
                    return (
                        <Card fluid key={data.Props.Id} onClick={() =>forwardToNews(data.Props.url) }>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='mini'
                                    src='https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/BirGün_logo.svg/1200px-BirGün_logo.svg.png'
                                />
                                <Card.Header>{data.Props.name}</Card.Header>
                                <Card.Meta>News</Card.Meta>
                                <Card.Description>
                                    <Image
                                        size='small'
                                        src={data.Props.image}
                                    />
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}


            </Card.Group>


    )
}

{/*{news.map((data) => {*/}
{/*    return (*/}
{/*        <List.Item key={data.Props.Id}>*/}
{/*            <Image avatar*/}
{/*                   src='https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/BirGün_logo.svg/1200px-BirGün_logo.svg.png'/>*/}
{/*            <List.Content>*/}
{/*                <List.Header>{data.Props.name}</List.Header>*/}
{/*                <Image rounded src={data.Props.image} size={"medium"}/>*/}
{/*            </List.Content>*/}
{/*        </List.Item>*/}
{/*    )*/}
{/*})}*/}
export default Agenda
