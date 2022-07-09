
//import 
const express = require('express');
const controller = require('../controller/webController.js');
const {authUser} = require('../controller/middleware.js')
//route
const route = express.Router();


route.get('/', controller.getIndex);


route.get('/create', controller.createPost);


route.get('/settings/:id', authUser, controller.getSettings)

route.get('/profile/:id', authUser, controller.getProfile)

route.post('/api/create', authUser, controller.postCreate)

route.get('/post/:id',authUser, controller.viewPost)

route.get('/home',authUser, controller.getHome);


route.post('/api/changePhoto',authUser, controller.changePic)

route.post('/api/changeUP',authUser, controller.changeUP)

route.get('/api/addComment', authUser, controller.addComment)


route.get('/post/:id/delete', controller.postDelete)

route.get('/comment/:id/delete', controller.commentDelete)

route.post('/api/changePassword', controller.changePass)

module.exports = route;