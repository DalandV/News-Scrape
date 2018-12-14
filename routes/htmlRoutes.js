// Require models goes here

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.send("This is the Landing Page!");
    });
};