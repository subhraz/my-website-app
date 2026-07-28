const sql = require("mssql");

const config = {
    server: "1481I-TI15416",
    database: "master",
    options: {
        instanceName: "SQLEXPRESS",
        trustServerCertificate: true
    }
};

async function test() {
    try {
        await sql.connect(config);
        console.log("Connected");
    } catch (err) {
        console.error(err);
    }
}

test();