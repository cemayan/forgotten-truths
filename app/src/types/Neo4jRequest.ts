interface Neo4jRequest {
    cypher?: string,
    params?:  Record<string, any>
}

export default Neo4jRequest;