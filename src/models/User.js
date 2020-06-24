class User{
    constructor(username,password) {
        if(username != undefined)
        this.username=username;

        if(password != undefined)
        this.password = password;
    }
}
module.exports = User;