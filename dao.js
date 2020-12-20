var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "0801",
    port: 3306,
    insecureAuth: true,
    database: "abc"
});

module.exports = {
    connect: function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log("==> " + new Date().toLocaleTimeString() + " DB Connection Successful!!");
        });
    },

    insertMsg: function (count, msg, topic, keywords) {
        let sql = "insert into messages(MSG_ID,MESSAGE,KEYWORDS,TOPIC,LANGUAGE) VALUES ('" + count + "','" + msg + "','" + keywords + "','" + topic + "','English')";
        con.query(sql, function (err) {
            if (err) throw err;
            console.log("==> " + new Date().toLocaleTimeString() + " 1 record inserted in messages Table");
        })
    },

    fetch: function (sql, callback) {
        con.query(sql, function (err, result) {
            if (err) throw err;
            callback(result);
        })
    }
}

