const edge = require("edge-js");
async function approvalSigned(jobID) {
    let connectionTest = edge.func({
        source: () => {/*
            #r "JobTrackerAPI5.dll"
            using System;
            using System.Threading.Tasks;
            using System.Collections.Generic;
            using System.Linq;
            using System.Text;
            using System.Threading.Tasks;
            using Moraware.JobTrackerAPI5;
            public class Startup
            {
                public async Task<object> Invoke(dynamic input)
                {
                    int jobid = (int)input.id;
                    var DB = (string)input.db;
                    var JTURL = "https://" + DB + ".moraware.net/";
                    var UID = (string)input.uid;
                    var PWD = (string)input.pwd;
                    Connection conn = new Connection(JTURL + "api.aspx", UID, PWD);
                    conn.Connect();
                    var job = conn.GetJob(jobid);
                    var jobName = job.JobName;
                    conn.Disconnect();
                    return jobName;
                }
            }
        */},
        references: ["JobTrackerAPI5.dll"]
    });
    connectionTest({id: jobID, uid: this.c.moraware.uid, pwd: this.c.moraware.pwd, db: this.c.moraware.db}, (error, result) => {
        error 
            ? this.log.error(error)
            : this.log.success(result)
    });
}

module.exports = approvalSigned