class User{
    constructor(username,password) {
        if(username != undefined)
        this.username=username;

        if(password != undefined)
        this.password = password;

        this.lvl = 1;
    }
}
module.exports = User;