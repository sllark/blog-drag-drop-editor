const express = require('express');
const {body} = require('express-validator');

const User = require('../models/User');
const isAuth = require('../helper/isAuth');

const postControllers = require('../controllers/postControllers')


const router = express.Router();


router.post('/savePost', isAuth, postControllers.savePost);

router.post('/updatePost', isAuth, postControllers.updatePost);


router.post('/deletePost', isAuth, postControllers.deletePost);

router.get('/getPost/:id', postControllers.getPost); // isAuth

// router.get('/getFullPost/:id',isAuth, postControllers.getFullPost); // isAuth


router.get('/getPosts', postControllers.getMultiplePosts); // isAuth

router.get('/getMyPosts',isAuth, postControllers.getMyPosts); // isAuth


// router.get('/getHomePosts', postControllers.getHomePosts);


module.exports = router;