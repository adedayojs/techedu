const { model } = require('mongoose');
const { user } = require('../schema/user');

const Users = model('Users', user);

module.exports = Users;
