module.exports = {
    query: function (query, callback) {
        console.log("==> " + new Date().toLocaleTimeString() + " Inside factCheck/query()");
        const https = require('https')
        const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?key=<api key>&query=${query}`

        const req = https.request(url, (res) => {
            let chunks = [];

            res.on("data", (chunk) => {
                chunks.push(chunk);
            });

            res.on("end", (chunk) => {
                let body = Buffer.concat(chunks);
                let data = JSON.parse(body);
                callback(data.claims);
            });

            res.on("error", (error) => {
                console.error(error);
            });
        });

        req.end();
    }
}