import React from 'react'
import {Feed, Icon, Image, Label} from 'semantic-ui-react'
import {toJS} from "mobx";
import nodeStore from "../store/NodeStore";

const Feeds = () => {

    const [events, setEvents] = React.useState<Array<any>>([]);


    React.useEffect(() => {

        const events = toJS(nodeStore.allEvents);
        if (events.length > 0) {
            setEvents(toJS(nodeStore.allEvents));
        } else {
            (async () => {
                await nodeStore.getAllEvents();
                setEvents(toJS(nodeStore.allEvents));
            })();
        }

    }, []);

    return (
        <Feed style={{overflow: 'auto', maxHeight: 400}}>

            {events.sort(() => Math.random() - 0.5).map((event) => {
                return (
                    <Feed.Event key={event.Id}>
                        <Feed.Content>
                            <Feed.Summary>
                                <b>{event.Props.name}</b>
                                <Feed.Date> {typeof(event.Props.timestamp)  ==="undefined" ?  ""  : event.Props.timestamp }</Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra images>
                                {event.Props.images.split(";").map((image: string | undefined) => {
                                    return(
                                        <a key={event.Id}>
                                            <Image size="small" rounded src={image}/>
                                        </a>
                                        )
                                })}

                            </Feed.Extra>
                            <Feed.Meta>

                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                )
            })}

        </Feed>
    )
}


export default Feeds
