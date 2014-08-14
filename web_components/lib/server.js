var
  path = require("path"),
  synt = require("synt"),
  express = require("express"),
  serve_static = require("serve-static"),
  body_parser = require("body-parser"),
  server_assets = path.join(__dirname, "..", "public"),
  bower_components = path.join(__dirname, "..", "bower_components")

function send_file(file_path) {
  return function (req, res) {
    var p = path.join(server_assets, file_path)
    res.type(path.extname(p))
    res.sendFile(p)
  }
}

function start() {
  var app = express()

  app.use(serve_static(server_assets))
  app.use(serve_static(bower_components))
  app.use(body_parser.urlencoded({extended: false}))

  app.get("/", send_file("index.html"))
  app.get("/polymer", send_file("polymer.html"))
  app.get("/xtags", send_file("xtags.html"))
  app.get("/vanilla", send_file("vanilla.html"))
  app.post("/detect", function (req, res) {
    var sim = synt.similar({
      compare: req.param("code"),
      to: req.param("variant")
    })

    res.status(200).send("Similarity is: %" + Math.floor(sim))
  })

  app.listen(3000, function () {
    console.log("Server listening on: http://localhost:3000")
  })
}

module.exports = {
  start: start
}
