exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.vipBoard = (req, res) => {
    res.status(200).send("VIP Content.");
};

exports.rapperBoard = (req, res) => {
    res.status(200).send("Rapper Content.");
};

exports.djBoard = (req, res) => {
    res.status(200).send("DJ Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
