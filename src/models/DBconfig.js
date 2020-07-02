const config  =require('../../config');

class Config{
    constructor(){
        this.host = config.db_url;
        this.user = config.db_user;
        this.password = config.db_pass;
        this.database = config.db_name;
    }
}
module.exports = Config;