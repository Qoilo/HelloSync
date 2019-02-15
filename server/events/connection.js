const edge = require("edge-js");
async function connection(_this) {
    let connectionTest = edge.func({
        source: () => {/*
            #r "JobTrackerAPI5.dll"
            using System;
            using System.Threading.Tasks;
            using System.IO;
            using System.Collections.Generic;
            using System.Linq;
            using System.Text;
            using System.Threading.Tasks;
            using Moraware.JobTrackerAPI5;
            public class Startup
            {
                public async Task<object> Invoke(dynamic input)
                {
                    var newDir = Directory.GetCurrentDirectory() + @"\temp";
                    Environment.CurrentDirectory = (newDir);
                    int jobid = (int)input.id;
                    var DB = (string)input.db;
                    string jobIDString = jobid.ToString();
                    string fileName = newDir + @"\" + @"signed-approval" + jobIDString + @".pdf";
                    var JTURL = "https://" + DB + ".moraware.net/";
                    var UID = (string)input.uid;
                    var PWD = (string)input.pwd;
                    Connection conn = new Connection(JTURL + "api.aspx", UID, PWD);
                    conn.Connect();
                    var job = conn.GetJob(jobid);
                    var jobName = job.JobName;
                    conn.Disconnect();
                    return fileName;
                }
            }
        */},
        references: ["JobTrackerAPI5.dll"]
    });
    connectionTest({id: _this.c.moraware.testJobID, uid: _this.c.moraware.uid, pwd: _this.c.moraware.pwd, db: _this.c.moraware.db}, (error, result) => {
        error 
            ? _this.log.error(`Error while making initial connection to https://${_this.c.moraware.db}.moraware.net:\n${error}`)
            : _this.log.success(`Successfully made initial connection to https://${_this.c.moraware.db}.moraware.net:\n${result}`)
    })
}

module.exports = connection