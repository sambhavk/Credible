const { Client } = require('pg');

const client = new Client({
    connectionString: 'DB URL'
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('select * from heroes;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});