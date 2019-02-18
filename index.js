const HelloSync = require(`${__dirname}/server/app`);
let c 
let server
loadConfig().then(() => {
  console.log(c.testJobID)
  server = new HelloSync(c);
})
process.on('SIGINT', async () => {
  server.log.warning('Gracefully exiting..');
  process.exit();
});
async function loadConfig() {
    process.argv[2] === "-test" 
        ? c = require(`${__dirname}/c.real.json`)
        : c = require(`${__dirname}/c.json`)
}
process.on("unhandledRejection", async err => server.log.uncaughtError(err.stack));
process.on("uncaughtException", async err => server.log.uncaughtError(err.stack));