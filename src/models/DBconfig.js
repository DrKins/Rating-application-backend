require ('dotenv').config();

class Config{
    constructor(){
        this.host = process.env.DATABASE_URL;
        this.user = process.env.DATABASE_USERNAME;
        this.password = process.env.DATABASE_PASSWORD;
        this.database = process.env.DATABASE_NAME;
    }
}
module.exports = Config;