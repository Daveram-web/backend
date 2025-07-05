import mysq from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const db = mysq.createPool({
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME
}).promise()

async function checkConnection(){
    try {
        const check = await db.getConnection();
        console.log("The DataBase Connected SucesFully");
        check.release()
    } catch (error) {
        console.log("The DataBase is Not connected");
        console.error(error);
    }
}

checkConnection()
export default db