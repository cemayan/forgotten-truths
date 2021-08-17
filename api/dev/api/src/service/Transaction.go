package service

import (
	"api/src/types"
	"encoding/json"
	"github.com/allegro/bigcache/v3"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

func ReadTransaction(session neo4j.Session, request types.ApiRequest, cache *bigcache.BigCache) ([]byte, error) {

	cacheValue, err  := cache.Get(request.CacheValue)

	if(err != nil) {

		result, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {

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

		strResult, err := json.Marshal(result)

		if err != nil {
			return nil, err
		}

		cache.Set(request.CacheValue, strResult)

		return strResult, err
	} else {
		return  cacheValue, nil
	}
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
