const https = require('https');

module.exports = {
    msg: function (callback) {
        let options = {
            'method': 'GET',
            'hostname': 'api.twilio.com',
            'path': '/2010-04-01/Accounts/<sid>/Messages.json',
            'rejectUnauthorized': false,
            'headers': {
                'Authorization': '<api key>'
                'Cookie': 'BCSI-CS-27c3ca7727ed0702=1',
                'Connection': 'keep-alive'
            }
        };

        const req = https.request(options, (res) => {
            let chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk);
            });

            res.on("end", (chunk) => {
                let str = res.headers["set-cookie"];
                if (str != undefined) {
                    if (((str[0]).substr(0, 26)) != (options.headers.Cookie)) {
                        options.headers.Cookie = (str[0]).substr(0, 26);
                        return;
                    }
                }
                let body = Buffer.concat(chunks);
                let data = JSON.parse(body);
                let to = data.messages[0].to;
                let from = data.messages[0].from;
                callback(data, to, from);
            });

            res.on("error", (error) => {
                console.error(error);
            });
        });

        req.end();
    }
}
