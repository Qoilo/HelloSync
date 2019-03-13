const c = require(`${__dirname}/../c.real.json`)
const s = require("snekfetch")
const rmKey = c.rm.key
const rmBase = "https://api.rmaster.com/api"
let rmToken
s.post(`${rmBase}/token?api_key=${rmKey}`)
    .attach("username", c.rm.username)
    .attach("password", c.rm.pass)
    .attach("granttype", "application")
    .then(r => {
        console.log("r.body\n" + r.body + "\n\n\n")
        console.log(r.body.TOKEN)
        rmToken = r.body.TOKEN
    });

console.log(rmToken)





/*
const rmKey = _this.c.rm.key
const rmBase = "https://api.rmaster.com/api"
s.post(`${rmBase}/token?api_key=${rmKey}`)
    .attach("username", _this.c.rm.username)
    .attach("password", _this.c.rm.pass)
    .attach("granttype", "application")
    .then(r => {
        rmToken = r.body.TOKEN
    });
*/