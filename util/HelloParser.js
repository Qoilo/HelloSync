class HelloParser {
    constructor (msg) {
        this.msg = msg
    }

    /* 
        Moraware.net Indentifiers
            - Job ID
        Found at end of URL when inside the job page
    */
    morawareJobID() {
        let reg = /(?<=mw-job-id: )\d*/
        let jobID = this.msg.match(reg)[0]
        return jobID
    }
    /*
        Rollmaster Identifiers
            - Company Number
            - Branch Number
            - Order Number
    */
    rmCompany() {
        let reg = /(?<=rm-company: )\d*/
        let company = this.msg.match(reg)[0]
        return company
    }
    rmBranch() {
        let reg = /(?<=rm-branch: )\d*/
        let branch = this.msg.match(reg)[0]
        return branch
    }
    rmONum() {
        let reg = /(?<=rm-o-num: )\d*/
        let orderNum = this.msg.match(reg)[0]
        return orderNum
    }
}
module.exports = HelloParser