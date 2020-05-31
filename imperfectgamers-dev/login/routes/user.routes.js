const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/home/all", controller.allAccess);

    app.get(
        "/api/home/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/home/vip",
        [authJwt.verifyToken],
        controller.vipBoard
    );

    app.get(
        "/api/home/rapper",
        [authJwt.verifyToken],
        controller.rapperBoard
    );

    app.get(
        "/api/home/dj",
        [authJwt.verifyToken],
        controller.djBoard
    );


    app.get(
        "/api/home/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/home/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};
