const express = require('express');
const {
  getUsers, getUserById, createUser, updateUserProfile, updateAvatar,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/:userId', getUserById);

usersRoutes.post('/users', createUser);

usersRoutes.patch('/users/me', updateUserProfile);

usersRoutes.patch('/users/me/avatar', updateAvatar);

exports.usersRoutes = usersRoutes;
