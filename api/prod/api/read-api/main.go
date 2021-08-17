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

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

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

	result, err := service.ReadTransaction(session, apiRequest, cacheManager)

	if err != nil {
		return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil
	}

	if !utils.IsNilFixed(result) {

		if err != nil {
			return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil

		}
		return events.APIGatewayProxyResponse{Body: string(result), StatusCode: 200}, nil
	} else {
		return events.APIGatewayProxyResponse{Body: "Error", StatusCode: 400}, nil
	}
}

func main() {
	lambda.Start(Handler)
}
