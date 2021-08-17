package main

import (
	"api/src/manager"
	"api/src/service"
	"api/src/types"
	"api/src/utils"
	"encoding/json"
	"fmt"
	"github.com/allegro/bigcache/v3"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"os"
)

var cacheManager *bigcache.BigCache
var session neo4j.Session


func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error)   {

		cacheManager = manager.InitCache()

		driver, err := neo4j.NewDriver(os.Getenv("FORGOTTEN_TRUTHS_NEO4J_ADDRESS"),
			neo4j.BasicAuth(
				os.Getenv("FORGOTTEN_TRUTHS_NEO4J_USERNAME"),
				os.Getenv("FORGOTTEN_TRUTHS_NEO4J_PASSWORD"),
				""))

		if err != nil {
			fmt.Println(err.Error())
		}
		defer driver.Close()


		session = driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
		defer session.Close()


	var apiRequest types.ApiRequest

	err = json.Unmarshal([]byte(request.Body), &apiRequest)

	result, err := service.WriteTransaction(session, apiRequest)

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil
	}

	if !utils.IsNilFixed(result) {

		ee, err := json.Marshal(result)

		if err != nil {
			return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil

		}

		return events.APIGatewayProxyResponse{Body: string(ee), StatusCode: 200}, nil
	} else{
		return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil
	}
}


func main() {

	//driver, err := neo4j.NewDriver("bolt://localhost:7687",
	//	neo4j.BasicAuth("neo4j", "password", ""))
	lambda.Start(Handler)


	//cachemanager
//	cacheManager := manager.InitCache()
//
//	driver, err := neo4j.NewDriver(os.Getenv("FORGOTTEN_TRUTHS_NEO4J_ADDRESS"),
//		neo4j.BasicAuth(
//			os.Getenv("FORGOTTEN_TRUTHS_NEO4J_USERNAME"),
//			os.Getenv("FORGOTTEN_TRUTHS_NEO4J_PASSWORD"),
//			""))
//
//	if err != nil {
//		fmt.Println(err.Error())
//	}
//	defer driver.Close()
//
//
//	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
//	defer session.Close()
//
//
//	router := fasthttprouter.New()
//	router.GET("/", Index)
//	router.POST("/read", Neo4jReadHandler(session, cacheManager))
//	router.POST("/create", Neo4jCreateHandler(session, cacheManager))
//
//
//
//	fasthttp.ListenAndServe(":8080", router.Handler)
}

