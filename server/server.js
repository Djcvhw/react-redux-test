var jsonServer = require('json-server')
var server = jsonServer.create()
var db = require("./generate.js")
var router = jsonServer.router(db())
var middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3999, function () {
  console.log('JSON Server is running on http://localhost:3999')
})

