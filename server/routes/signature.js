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
            let mJobID = "HelloSync_Not_Set",
                cN = "HelloSync_Not_Set",
                bN = "HelloSync_Not_Set",
                oN = "HelloSync_Not_Set"
            if(this.c.moraware.enabled) mJobID = parser.morawareJobID()
            if(this.c.rollmaster.enabled) cN = parser.rmCompany()
            if(this.c.rollmaster.enabled) bN = parser.rmBranch()
            if(this.c.rollmaster.enabled) oN = parser.rmONum()
            let dl = helloEvent.signature_request.signature_request_id
            this.events.approvalSigned(this, mJobID, dl)
            this.log.success("Document Signed!")
        } else return this.log.verbose(helloEvent.event.event_type)
    })
}
module.exports = signature