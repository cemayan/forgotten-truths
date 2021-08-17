import React from 'react';
import {observer} from "mobx-react";
import {Button, Divider, Grid, Header, Icon, Label, Segment} from "semantic-ui-react";
import Feeds from "../components/Feeds";
import Agenda from "../components/Agenda";
import FTStatistic from "../components/FTStatistic";
import UsefulContent from "../components/UsefulContent";


const Home = observer(() => {

    return (
        <>
            <Segment color="teal">
                <Header as='h3' textAlign='center' >
                    Statistics
                </Header>
                <FTStatistic/>
            </Segment>

            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column >
                        <Segment color="red">
                            <Header as='h3' textAlign='left' >
                                    <Icon name='attention'/>  You must never forget!
                            </Header>
                            <Divider clearing/>
                            <Feeds/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment color="orange">
                                <Header as='h3' textAlign='right'>
                                    <Icon name='newspaper'/>   Agendas
                                </Header>

                            <Agenda/>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Segment color="brown">
                <Header as='h3' textAlign='center' >
                    <Icon name='pin'/> Useful Contents
                </Header>
                <UsefulContent/>
            </Segment>


        </>
    )
})

export default Home;
