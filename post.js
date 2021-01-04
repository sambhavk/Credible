module.exports = {
    post: function (data, to) {
        const https = require('https');
        const qs = require('querystring');

        let options = {
            'method': 'POST',
            'hostname': 'api.twilio.com',
            'rejectUnauthorized': false,
            'path': '/2010-04-01/Accounts/<sid>/Messages.json',
            'headers': {
                'Authorization': '<api key>',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'BCSI-CS-56b718e4a1eba607=1',
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
            });

            res.on("error", (error) => {
                console.error(error);
            });
        });


        let postData = qs.stringify({
            'To': to,
            'From': 'whatsapp:+14155238886',
            'Body': data
        });

        req.write(postData);
        req.end();
    }
}