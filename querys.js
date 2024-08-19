const { getConnection } = require("./database.js")

const getCodRoute = async (codRoute) => {
    const pool = await getConnection()
    const result = await pool.request().query(`SELECT * FROM ${process.env.DB_TABLE} WHERE ${process.env.DB_COLUM}=${codRoute}`)
    let codRoutes = []
    if (result.recordset.length == 0) {
        return codRoutes
    } else {
        result.recordset.forEach(row => {
            codRoutes.push(row[process.env.DB_CODCOLUM])
        });
        return codRoutes
    }
}

module.exports = { getCodRoute }