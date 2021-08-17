import Neo4jRequest from "../types/Neo4jRequest";

let read_addr = "";
let create_addr = "";
if(`${process.env.STAGE}` === "prod" ) {
    console.log( `${process.env.NEO4J_READ_ADDR_PROD}`)
    read_addr = `${process.env.NEO4J_READ_ADDR_PROD}`;
    create_addr = `${process.env.NEO4J_CREATE_ADDR_PROD}`;
}
else {
    read_addr = `${process.env.NEO4J_READ_ADDR_DEV}`;
    create_addr = `${process.env.NEO4J_CREATE_ADDR_DEV}`;
}




const goService = {
    getResults: (obj: Neo4jRequest) : Promise<Array<Record<string, any>>> => {

        const results =  fetch(read_addr,
            {
                method: 'POST',
                body: JSON.stringify(obj)
            }).then(x=>x.json())
            .catch((err) => {
                console.log(err);
            });

        return results;
    },
    createNode: (obj: Neo4jRequest) : Promise<Array<Record<string, string>>> => {

        const results =  fetch(create_addr,
            {
                method: 'POST',
                body: JSON.stringify(obj)
            }).then(x=>x.json())
            .catch((err) => {
                console.log(err);
            });

        return  results;
    }
}


export default goService;

