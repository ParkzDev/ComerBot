const sql = require('mssql')

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

const getConnection = async () => {
    try {
        const pool = await sql.connect(sqlConfig)
        return pool
    } catch (err) {
        console.error('Error Database connection: ' + err)
    }
}

module.exports = { getConnection }