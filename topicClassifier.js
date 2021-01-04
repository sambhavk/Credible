module.exports = {
    topic: function (params,callback) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside topicClassifier/topic()");
        const https = require('https');
        const fs = require('fs');

        let options = {
            'method': 'POST',
            'hostname': 'api.monkeylearn.com',
            'path': '/v3/classifiers/cl_o46qggZq/classify/',
            'rejectUnauthorized': false,
            'headers': {
                'Authorization': '<api key>',
                'Content-Type': 'application/json'
            },
        };

        const req = https.request(options, (res) => {
            let chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk);
            });

            res.on("end", (chunk) => {
                let body = Buffer.concat(chunks);
                let data=JSON.parse(body);
                callback(data[0].classifications[0].tag_name);
            });

            res.on("error", (error) => {
                console.error(error);
            });
        });

        let postData = JSON.stringify({ "data": [params] });

        req.write(postData);

        req.end();
    }
}