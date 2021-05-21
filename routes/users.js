const express = require('express');

const {
  getUsers, getUserById, updateUserProfile, updateAvatar, getCurrentProfile,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);

usersRoutes.get('/users/me', getCurrentProfile);

usersRoutes.get('/users/:userId', getUserById);

usersRoutes.patch('/users/me', updateUserProfile);

usersRoutes.patch('/users/me/avatar', updateAvatar);

exports.usersRoutes = usersRoutes;
