import React from "react";
import {Container, Menu} from "semantic-ui-react";
import Home from "./containers/Home";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TopicsByPerson from "./containers/TopicsByPerson";
import PersonsByTopic from "./containers/PersonsByTopics";
import TopicsOfShame from "./containers/TopicsOfShame";
import {observer} from "mobx-react";
import Config from "./containers/Config";

const App: React.FC = observer(() => {

    const [activeItem, setActiveItem] = React.useState('home')

    const handleItemClick = (e :React.MouseEvent, { name }:any) => {
        setActiveItem(name)  ;
    }


    return (
        <Router>
            <div>
                <Menu fixed="top"   inverted >
                    <Container>
                        <Menu.Item as="a" header={true}>
                            Forgotten Truths
                        </Menu.Item>
                        <Menu.Item as={Link}  name="home" to="/" className="item"  onClick={handleItemClick}
                                   active={activeItem === 'home'}  >
                            Home
                        </Menu.Item>
                        <Menu.Item as={Link}   name="topicsofshame"   to="/topicsofshame" className="item" onClick={handleItemClick}
                                   active={activeItem === 'topicsofshame'}>
                            TopicsOfShame
                        </Menu.Item>
                        <Menu.Item as={Link}  name="topicsbyperson"   to="/topicsbyperson" className="item" onClick={handleItemClick}
                                   active={activeItem === 'topicsbyperson'}>
                            TopicsByPerson
                        </Menu.Item>
                        <Menu.Item as={Link}  name="personsbytopic"   to="/personsbytopic" className="item" onClick={handleItemClick}
                                   active={activeItem === 'personsbytopic'}>
                            PersonsByTopic
                        </Menu.Item>
                        {`${process.env.STAGE}` === "dev" ?
                            <Menu.Item as={Link}  name="config"   to="/config" className="item" onClick={handleItemClick}
                                                                                 active={activeItem === 'config'}>
                                Config
                            </Menu.Item>
                                :  <></>
                            }

                    </Container>
                </Menu>

                <Container  style={{marginTop: '7em'}}>
                    <Route exact={true} path="/" component={() => <Home/>}/>
                    <Route path="/topicsofshame" component={() => <TopicsOfShame/>}/>
                    <Route path="/topicsbyperson" component={() => <TopicsByPerson/>}/>
                    <Route path="/personsbytopic" component={() => <PersonsByTopic/>}/>
                    <Route path="/config" component={() => <Config/>}/>

                </Container>
            </div>
        </Router>
    );
});
export default App;