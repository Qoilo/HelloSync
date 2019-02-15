const formidable = require("formidable")
async function signature(req, res) {
    // Send Hellosign response
    res.statusCode = 200
    res.setheader("Content-Type", "text/text")
    res.send("Hello API Event Received") // Has to be exactly this or callback URL will get reset
    res.end()

    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        let helloEvent = fields.json
        if(helloEvent.event.event_type === "signature_request_sent") {
            // This event will be finished last, after ApprovalSigned is confirmed working & uploading
            //this.events.approvalSent(1428).bind(this)
        } else if(helloEvent.event.event_type === "signature_request_all_signed") {
            this.events.approvalSigned(this)
            this.log.success("Document Signed!")
        } else return this.log.verbose(helloEvent.event.event_type)
    })
}
module.exports = signature