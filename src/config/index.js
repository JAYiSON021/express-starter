// sets of configs that are advised not to commit on public repos
// or must be in environmental vars.
export default {
    "port": 3002,
    "mongoUrl": "mongodb://localhost:27017/venu-monggo",
    "mongoUrlProd": `mongodb://62b9ccd95243103bd6e83644b2d11dff:72F86f7c252b888@5a.mongo.evennode.com:27017,5b.mongo.evennode.com:27017/62b9ccd95243103bd6e83644b2d11dff?replicaSet=us-5`,
    "bodyLimit": "100kb",    
    "secret": "w3 haV3 th3 kN0w",  
    "tokentime": 60*60*24*30 //30 Days
}   
