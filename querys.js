const { getConnection } = require("./database.js")
const randn = require('randn');
const { formatedTimestamp } = require("./utils/currentdate.js")
const getCodRoute = async (codRoute) => {
    const pool = await getConnection()
    const result = await pool.request().query(`SELECT * FROM ${process.env.DB_TABLE} WHERE ${process.env.DB_COLUM}=${codRoute}`)
    let codRoutes = []
    if (result.recordset.length === 0) {
        return codRoutes
    } else {
        result.recordset.forEach(row => {
            codRoutes.push(row[process.env.DB_CODCOLUM])
        });
        return codRoutes
    }
}

const insertPasswordRoute = async (codRoute) => {

    let codRoutes = await getCodRoute(codRoute)
    let cantcods = codRoutes.length;
    if (cantcods === 0) {
        return codRoutes;
    } else {
        const pool = await getConnection()
        await pool.request().query(`DELETE FROM ${process.env.DB_TABLE} WHERE ${process.env.DB_COLUM}=${codRoute}`)

        for (let i = 0; i < cantcods; i++) {
            let passcod = randn(4)
            let addtime = formatedTimestamp()
            await pool.request().query(`INSERT INTO  ${process.env.DB_TABLE} VALUES (2,1, ${codRoute},${passcod},'COMERBOT', '${addtime}',NULL,NULL,NULL,NULL)`)
          }
        codRoutes = getCodRoute(codRoute);
    }
    return codRoutes
}

module.exports = { getCodRoute,insertPasswordRoute }