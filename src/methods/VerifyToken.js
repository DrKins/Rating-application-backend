const verification = {
    ver(req, res, next) {
        const bearerHeader = req.headers['authorization']; //takes the auth header
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' '); // splitis the auth header at whitespace
            const bearerToken = bearer[1];
            req.token = bearerToken; //sets the req.token of next to the second part of the split auth token
            next();
        } else {
            res.sendStatus(403);
        }
    }
}

module.exports = verification;
