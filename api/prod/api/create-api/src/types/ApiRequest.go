package types

type ApiRequest struct {
	Cypher   string  `json:"cypher,omitempty"`
	Params   map[string]interface{}  `json:"params,omitempty"`
}