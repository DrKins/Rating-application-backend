class User{
    constructor(username,password,lvl,company) {
        if(username != undefined)
        this.username=username;

        if(password != undefined)
        this.password = password;
       
        if(lvl!= undefined)
        this.lvl= lvl;

        if(company!= undefined)
        this.company= company;

    }
}
module.exports = User;