import { DataSet, Network } from 'vis';
import React from "react";

// const nodes = new DataSet([
//     { id: 1, label: 'Node 1', shape: 'circle' },
//     { id: 2, label: 'Node 2' , shape: 'circle'},
//     { id: 3, label: 'Node 3', shape: 'circle' },
//     { id: 4, label: 'Node 4' , shape: 'circle'},
//     { id: 5, label: 'Node 5', shape: 'circle' }
// ]);
//
// // create an array with edges
// const edges = new DataSet([
//     { from: 1, to: 3 },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 }
// ]);


// initialize your network!

interface VIS {
    nodes: DataSet<any>
    edges: DataSet<any>
}

const VisNetwork = (props: VIS ) => {

    const data = {
        nodes: props.nodes,
        edges: props.edges
    };

    const options = {
        nodes: {
            borderWidth: 4,
            color: {
                border: "#222222",
                background: "#666666"
            },
            font: { color: "#eeeeee" },
        },
        edges: {
            color: "lightgray"
        }
    };

    const triggeredRef = React.useCallback( node => {
        if ( node === null )
            return;

        const network = new Network(node, data, options);
    }, [data]);


    return (
        <div ref={triggeredRef} style={{ height:1000 }} />
    );

}

export default VisNetwork