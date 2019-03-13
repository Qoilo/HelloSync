const c = require(`${__dirname}/../c.real.json`)
const s = require("snekfetch")
const rmKey = c.rollmaster.key
const rmBase = "https://api.rmaster.com/api/flooringliquidators"
console.log(JSON.stringify(c.rollmaster))
s.post(`${rmBase}/token?api_key=${rmKey}`)
    .attach("username", c.rollmaster.username)
    .attach("password", c.rollmaster.password)
    .attach("granttype", "client")
    .then(r => {
        console.log("r.body\n" + r.body + "\n\n\n")
        console.log(r.body.TOKEN)
        let rmToken = r.body.TOKEN
        s.post(`${rmBase}/token?api_key=${rmKey}`)
            .attach("token", rmToken)
            .attach("granttype", "client")
            .then(r => {
                console.log("\n\ndeleting token for RM client session")
            });
    });


    process.on("unhandledRejection", async err => console.log(err.stack));
    process.on("uncaughtException", async err => console.log(err.stack));


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