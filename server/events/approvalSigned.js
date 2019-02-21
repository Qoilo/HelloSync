const edge = require("edge-js");
const s = require("snekfetch")
const events = require("events")
const fs = require("fs")
const emitter = new events.EventEmitter();
async function approvalSigned(_this, jobID, dl) {
    const fileToken = _this.utils.randomToken()
    const downloaded = function downloaded() {
        _this.log.verbose("Finished Downloading")
    }
    emitter.addListener("downloaded", downloaded)
    let uploadToMoraware = edge.func({
        source: () => {/*
            #r "C:\\Users\\Administrator\\Downloads\\HelloSync-master\\HelloSync-master\\JobTrackerAPI5.dll"
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
                    var newDir = Directory.GetCurrentDirectory();
                    Environment.CurrentDirectory = (newDir);
                    int jobid = (int)input.id;
                    var DB = (string)input.db;
                    string fileToken = (string)input.token;
                    string filePath = newDir + @"\" + @"hellosign-document-" + fileToken + @".pdf";
                    var JTURL = "https://" + DB + ".moraware.net/";
                    var UID = (string)input.uid;
                    var PWD = (string)input.pwd;
                    Connection conn = new Connection(JTURL + "api.aspx", UID, PWD);
                    conn.Connect();
                    var jf = new JobFile(jobid, "hellosign-document-" + fileToken + ".pdf");
                    var fi = new FileInfo(filePath);
                    conn.UploadJobFile(jf, fi, false);
                    conn.Disconnect();
                    return filePath;
                }
            }
        */},
        references: [`C:\\Users\\Administrator\\Downloads\\HelloSync-master\\HelloSync-master\\JobTrackerAPI5.dll`]
    });

    _this.hellosign.signatureRequest.download(dl, {file_type: "pdf"}, (err, res) => {
        let fl = fs.createWriteStream(`${__dirname}/../../temp/hellosign-document-${fileToken}.pdf`)
        res.pipe(fl)
        fl.on("finish", () => {
            fl.close()
            _this.log.verbose("Successfully wrote signed approval to disk")
            emitter.emit("downloaded")
        })
    })
    emitter.on("downloaded", () => {
        _this.log.warning("Firing Downloaded Event")
        uploadToMoraware({id: parseInt(jobID), uid: _this.c.moraware.uid, pwd: _this.c.moraware.pwd, db: _this.c.moraware.db, token: fileToken}, (error, result) => {
            error 
                ? _this.log.error(error.stack)
                : _this.log.success(result)
            fs.unlink(`${__dirname}/../../temp/hellosign-document-${fileToken}.pdf`, err => {
                err
                    ? _this.log.error(err.stack)
                    : _this.log.success(`Successfully Deleted File: hellosign-document-${fileToken}.pdf`)
            })
        });
    })
}

module.exports = approvalSigned