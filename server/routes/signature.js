const formidable = require("formidable")
const HelloParser = require(`${__dirname}/../../util/HelloParser.js`)
async function signature(req, res) {
    // Send Hellosign response
    res.statusCode = 200
    res.setheader("Content-Type", "text/text")
    res.send("Hello API Event Received") // Has to be exactly this or callback URL will get reset
    res.end()

    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        let helloEvent = fields.json
        let parser = new HelloParser(helloEvent.signature_request.message)
        if(helloEvent.event.event_type === "signature_request_sent") {
            // This event will be finished last, after ApprovalSigned is confirmed working & uploading
            //this.events.approvalSent(1428).bind(this)
        } else if(helloEvent.event.event_type === "signature_request_all_signed") {
            let mJobID = parser.morawareJobID()
            let dl = helloEvent.signature_request.files_url
            this.events.approvalSigned(this, mJobID, dl)
            this.log.success("Document Signed!")
        } else return this.log.verbose(helloEvent.event.event_type)
    })
}
module.exports = signature