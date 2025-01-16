const userModel = require("../models/userModel");

function getUsers(req, res) {
    const listOfUsers = userModel.getUsers();
    res.render('users', {users: listOfUsers});
}

module.exports = {
    getUsers
}