class Reaction{
    constructor(date,reaction,company) {
        if(date != undefined)
        this.date=date;

        if(reaction != undefined)
        this.reaction = reaction;

        if(company != undefined)
        this.company = company;
    }
}

module.exports = Reaction;