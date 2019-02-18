const edge = require("edge-js");
const s = require("snekfetch")
async function approvalSigned(__this, jobID, dl) {
    let uploadToMoraware = edge.func({
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
                    var newDir = Directory.GetCurrentDirectory() + @"/temp";
                    Environment.CurrentDirectory = (newDir);
                    int jobid = (int)input.id;
                    var DB = (string)input.db;
                    string jobIDString = jobID.ToString();
                    string filePath = newDir + @"/" + @"signed-approval" + jobIDString + @".pdf";
                    var JTURL = "https://" + DB + ".moraware.net/";
                    var UID = (string)input.uid;
                    var PWD = (string)input.pwd;
                    Connection conn = new Connection(JTURL + "api.aspx", UID, PWD);
                    conn.Connect();
                    var jf = new JobFile(jobid, "signed-approval.pdf");
                    var fi = new FileInfo(filePath);
                    conn.UploadJobFile(jf, fi, false);
                    conn.Disconnect();
                    return jobName;
                }
            }
        */},
        references: [`JobTrackerAPI5.dll`]
    });

    s.get(dl).then(r => {
        fs.writeFile(`${__dirname}/../../temp/signed-approval${jobID}.pdf`, r.body, (err) => {
            uploadToMoraware({id: jobID, uid: _this.c.moraware.uid, pwd: _this.c.moraware.pwd, db: _this.c.moraware.db}, (error, result) => {
                error 
                    ? _this.log.error(error)
                    : _this.log.success(result)
                fs.unlink(`${__dirname}/../../temp/signed-approval${jobID}.pdf`, err => {
                    err
                        ? _this.log.error(err)
                        : _this.log.success(`Successfully Delete File: signed-approval${jobID}.pdf`)
                })
            });
        })
    })
}

module.exports = approvalSigned