class Reaction{
    constructor(date,reaction) {
        if(date != undefined)
        this.date=date;

        if(reaction != undefined)
        this.reaction = reaction;
    }
}

module.exports = Reaction;