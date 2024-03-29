const mysql = require("mysql")
const mysql2 = require("mysql2/promise")

const createDbClient = config => {
    const pool = mysql.createPool({
        connectionLimit: 100,
        host: config.host, 
        port: config.port, 
        user: config.user, 
        password: config.password, 
        database : config.database
    })

    return (query) => {
        return new Promise((resolve, reject) => {
            pool.query(
                query,
                function (err, res) {
                    if (err) throw(err)
                    return resolve(res)
                }
            )
        })
    }
}

const createDbClient2 = async config => {
    return await mysql2.createConnection({
        connectionLimit: 100,
        host: config.host, 
        port: config.port, 
        user: config.user, 
        password: config.password, 
        database : config.database
    })
}

module.exports = {
    createDbClient,
    createDbClient2
}