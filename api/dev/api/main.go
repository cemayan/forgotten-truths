package main

import (
	"api/src/manager"
	"api/src/service"
	"api/src/types"
	"api/src/utils"
	"encoding/json"
	"fmt"
	"github.com/allegro/bigcache/v3"
	"github.com/buaazp/fasthttprouter"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"github.com/valyala/fasthttp"
	"os"
)

var (
	corsAllowHeaders     = "*"
	corsAllowMethods     = "HEAD,GET,POST,PUT,DELETE,OPTIONS"
	corsAllowOrigin      = "*"
	corsAllowCredentials = "true"
)


func Index(ctx *fasthttp.RequestCtx) {


	ctx.Response.Header.Set("Access-Control-Allow-Credentials", corsAllowCredentials)
	ctx.Response.Header.Set("Access-Control-Allow-Headers", corsAllowHeaders)
	ctx.Response.Header.Set("Access-Control-Allow-Methods", corsAllowMethods)
	ctx.Response.Header.Set("Access-Control-Allow-Origin", corsAllowOrigin)

	ctx.Response.SetStatusCode(200)

	ctx.SetContentType("application/json;charset=utf-8")
	ctx.Write([]byte("OK!"))
}

func Neo4jReadHandler(session neo4j.Session, cache *bigcache.BigCache) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {

		ctx.Response.Header.Set("Access-Control-Allow-Credentials", corsAllowCredentials)
		ctx.Response.Header.Set("Access-Control-Allow-Headers", corsAllowHeaders)
		ctx.Response.Header.Set("Access-Control-Allow-Methods", corsAllowMethods)
		ctx.Response.Header.Set("Access-Control-Allow-Origin", corsAllowOrigin)

		var apiRequest types.ApiRequest

		err := json.Unmarshal(ctx.Request.Body(), &apiRequest)

		result, err := service.ReadTransaction(session, apiRequest, cache)

		if err != nil {
			ctx.Response.SetStatusCode(400)
			ctx.Write([]byte("Error!"))
		}

		if !utils.IsNilFixed(result) {
			ctx.SetContentType("application/json;charset=utf-8")
			ctx.Write(result)
		} else{
			ctx.Write([]byte("Not Found!"))
		}

	}
}


func Neo4jCreateHandler(session neo4j.Session, cache *bigcache.BigCache) fasthttp.RequestHandler {
	return func(ctx *fasthttp.RequestCtx) {

		ctx.Response.Header.Set("Access-Control-Allow-Credentials", corsAllowCredentials)
		ctx.Response.Header.Set("Access-Control-Allow-Headers", corsAllowHeaders)
		ctx.Response.Header.Set("Access-Control-Allow-Methods", corsAllowMethods)
		ctx.Response.Header.Set("Access-Control-Allow-Origin", corsAllowOrigin)


		var apiRequest types.ApiRequest

		err := json.Unmarshal(ctx.Request.Body(), &apiRequest)

		result, err := service.WriteTransaction(session, apiRequest)

		if err != nil {
			ctx.Response.SetStatusCode(400)
			ctx.Write([]byte("Error!"))
		}

		if !utils.IsNilFixed(result) {

			ee, err := json.Marshal(result)

			if err != nil {
				ctx.Response.SetStatusCode(400)
				ctx.Write([]byte("Json Marshall error!"))
				return
			}

			ctx.SetContentType("application/json;charset=utf-8")
			ctx.Write(ee)
		} else{
			ctx.Write([]byte("Not Found!"))
		}

	}
}

func main() {

	//driver, err := neo4j.NewDriver("bolt://localhost:7687",
	//	neo4j.BasicAuth("neo4j", "password", ""))

	//cachemanager
	cacheManager := manager.InitCache()

	driver, err := neo4j.NewDriver(os.Getenv("FORGOTTEN_TRUTHS_NEO4J_ADDRESS"),
		neo4j.BasicAuth(
			os.Getenv("FORGOTTEN_TRUTHS_NEO4J_USERNAME"),
			"FORGOTTEN_TRUTHS_NEO4J_PASSWORD",
			""))

	if err != nil {
		fmt.Println(err.Error())
	}
	defer driver.Close()


	session := driver.NewSession(neo4j.SessionConfig{AccessMode: neo4j.AccessModeRead})
	defer session.Close()


	router := fasthttprouter.New()
	router.GET("/", Index)
	router.POST("/read", Neo4jReadHandler(session, cacheManager))
	router.POST("/create", Neo4jCreateHandler(session, cacheManager))



	fasthttp.ListenAndServe(":8080", router.Handler)
}

