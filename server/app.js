const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const utils = require(`${__dirname}/../util`)
const routes = require(`${__dirname}/routes`)
const events = require(`${__dirname}/events`)
const https = require("https")

class HelloSync {
  constructor (c) {
    const hellosign = require("hellosign-sdk")({key: c.hellosign.key});
    this.hellosign = hellosign
    this.events = events
    this.utils = utils
    this.log = utils.log
    this.auth = utils.auth
    this.c = c
    this.app = app
    this.app.use(bodyParser.text())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));
    this.app.get("/", routes.main.bind(this))
    this.app.post("/signature", routes.signature.bind(this))
    this.startServer()
}

  async startServer() {
    this.events.connection(this)
    if(this.c.secure) {
        let privateKey = fs.readFileSync("key.pem");
        let certificate = fs.readFileSync("cert.pem");
        https.createServer({
            key: privateKey,
            cert: certificate
        }, this.app).listen(this.c.securePort);
        this.log.success(`Secure server listening on port ${this.c.securePort}`)
    } else {
        this.app.listen(this.c.port, () => {
            this.log.success(`Server listening on port ${this.c.port}`)
        })
    }
  }
}

module.exports = HelloSync;