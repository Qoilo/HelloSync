class HelloParser {
    constructor (msg) {
        this.msg = msg
    }
    morawareJobID() {
        let reg = /(?<=mw-job-id: )\d*/
        let jobID = this.msg.match(reg)[0]
        return jobID
    }
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
        let reg = /(?<=rm-0-num: )\d*/
        let orderNum = this.msg.match(reg)[0]
        return orderNum
    }
}
module.exports = HelloParser