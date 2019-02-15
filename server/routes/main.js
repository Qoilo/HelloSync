async function main(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.write("HelloSync Server")
    res.end()
}
module.exports = main