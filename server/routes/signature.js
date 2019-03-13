const formidable = require("formidable")
const HelloParser = require(`${__dirname}/../../util/HelloParser.js`)
async function signature(req, res) {
    // Send Hellosign response
    res.statusCode = 200
    res.setHeader("Content-Type", "text/text")
    res.send("Hello API Event Received") // Has to be exactly this or callback URL will get reset
    res.end()

    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        let helloEvent = JSON.parse(fields.json)
        let parser = new HelloParser(helloEvent.signature_request.message)
        if(helloEvent.event.event_type === "signature_request_sent") {
            // This event will be finished last, after ApprovalSigned is confirmed working & uploading
        } else if(helloEvent.event.event_type === "signature_request_all_signed") {
            this.mJobID = "HelloSync_Not_Set"
            this.cN = "HelloSync_Not_Set"
            this.bN = "HelloSync_Not_Set"
            this.oN = "HelloSync_Not_Set"
            if(this.c.moraware.enabled) this.mJobID = parser.morawareJobID()
            if(this.c.rollmaster.enabled) this.cN = parser.rmCompany()
            if(this.c.rollmaster.enabled) this.bN = parser.rmBranch()
            if(this.c.rollmaster.enabled) this.oN = parser.rmONum()
            let dl = helloEvent.signature_request.signature_request_id
            this.events.approvalSigned(this, dl)
            this.log.success("Document Signed!")
        } else return this.log.verbose(helloEvent.event.event_type)
    })
}
module.exports = signature