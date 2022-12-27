import mysql from "mysql"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "0420",
    database: "invoice"
})