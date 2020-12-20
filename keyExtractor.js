module.exports = {
    keyword: function (params, callback) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside keyExtractor/keyword()");
        const https = require('https');
        let options = {
            'method': 'POST',
            'hostname': 'api.monkeylearn.com',
            'path': '/v3/extractors/ex_YCya9nrn/extract/',
            'rejectUnauthorized': false,
            'headers': {
                'Authorization': 'Token 3be945e0e9c5a1f16556c9fb0a3e1d1a12c797fd',
                'Content-Type': 'application/json',
                'Cookie': 'BCSI-CS-27c3ca7727ed0702=1'
            }
        };

        const req = https.request(options, (res) => {
            let chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk);
            });

            res.on("end", (chunk) => {
                let body = Buffer.concat(chunks);
                let data = JSON.parse(body);
                let str1 = data[0].extractions.map(items => { return (items.parsed_value) });
                let str2 = str1.join(" ");
                callback(str2);
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