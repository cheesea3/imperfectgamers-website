const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isOwner = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "owner") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Staff Only Error: Moderator is required!"
            });
        });
    });
};

isVip = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "vip") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "VIP Exclusive: Sorry! You need to be a VIP to access this material. Subscribe now at imperfectgamers.org/shop/."
            });
        });
    });
};

var domain = 'contoso.auth0.com';
var clientID = 'DyG9nCwIEofSy66QM3oo5xU6NFs3TmvT';

var lock = new Auth0Lock(clientID, domain);
lock.show({
    focusInput: false,
    popup: true,
}, function (err, profile, token) {
    alert(err);
});

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Staff Only Error: Admin is required!"
            });
            return;
        });
    });
};

isRapper = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "rapper") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Sorry! You need to be a rapper!"
            });
            return;
        });
    });
};

isDj = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "dj") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Sorry! You need to be a DJ!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Staff Only Error: Moderator is required!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }

                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Staff Only Error: Moderator or Admin is required!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
