import React from "react";
import {Divider, Form, Grid, Label} from "semantic-ui-react";
import {DataSet} from "vis";
import functions from "../functions/Functions";
import VisNetwork from "../components/Graph";



const TopicsOfShame: React.FC = () => {

    const [year, setYear] = React.useState<number | null>(2000);
    const [nodes, setNode] = React.useState(new DataSet());



    const handleChange= async (e:React.ChangeEvent, { name, value }:any )  => {
        setYear(value);
        setNode(new DataSet());

        const data_map =  await functions.getEventsByyear(parseInt(value));
        setNode(data_map.nodes);
    }

    return (
        <>
            <Grid columns={1}>
                <Grid.Column as={Form}>
                    <Form.Input
                        label={<Label color={"yellow"}>Year: {year} </Label>}
                        min={2000}
                        max={2021}
                        name='year'
                        onChange={handleChange}
                        step={1}
                        type='range'
                        value={year}
                    />
                </Grid.Column>
            </Grid>
            <Divider/>
            <VisNetwork nodes={nodes} edges={new DataSet()} />
        </>

    )
}


export default TopicsOfShame;



