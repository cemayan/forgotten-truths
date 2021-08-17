package service

import (
	"api/src/types"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

func ReadTransaction(session neo4j.Session, request types.ApiRequest) (interface{}, error) {

	movies, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {

		var list []interface{}


		result, err := tx.Run(	request.Cypher, request.Params)

		if err != nil {
			return nil, err
		}

		for result.Next() {
			list = append(list, result.Record().Values[0])
		}

		if err = result.Err(); err != nil {
			return nil, err
		}

		return list, err
	})

	return movies, err
}



func WriteTransaction(session neo4j.Session, request types.ApiRequest) (interface{}, error) {

	movies, err := session.WriteTransaction(func(tx neo4j.Transaction) (interface{}, error) {

		var list []interface{}


		result, err := tx.Run(request.Cypher, request.Params)

		if err != nil {
			return nil, err
		}

		for result.Next() {
			list = append(list, result.Record().Values)
		}

		if err = result.Err(); err != nil {
			return nil, err
		}

		return list, err
	})

	return movies, err
}
