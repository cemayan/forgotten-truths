import React from 'react'
import {Statistic, Icon, Image} from 'semantic-ui-react'


const FTStatistic = () => {


    return (
        <Statistic.Group>


            {/*<Statistic>*/}
            {/*    <Statistic.Value>22</Statistic.Value>*/}
            {/*    <Statistic.Label>Saves</Statistic.Label>*/}
            {/*</Statistic>*/}


            <Statistic>
                <Statistic.Value>
                    <Icon name='woman' color="purple" />215
                </Statistic.Value>
                <Statistic.Label>Death</Statistic.Label>
            </Statistic>

            {/*<Statistic>*/}
            {/*    <Statistic.Value>*/}
            {/*        <Image src='https://react.semantic-ui.com//images/avatar/small/joe.jpg' inline circular />*/}
            {/*        42*/}
            {/*    </Statistic.Value>*/}
            {/*    <Statistic.Label>Team Members</Statistic.Label>*/}
            {/*</Statistic>*/}
        </Statistic.Group>
    )
}

export default FTStatistic;
