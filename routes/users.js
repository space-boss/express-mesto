const express = require('express');
const {getUsers, getUserById, createUser } = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);

usersRoutes.get('users/:userId', getUserById);

usersRoutes.post('/users', createUser);

exports.usersRoutes = usersRoutes;



