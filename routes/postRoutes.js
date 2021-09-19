const express = require('express');
const {body, check} = require('express-validator')

const validateObjectID = require('../helper/validateObjectID')
const isAuth = require('../helper/isAuth');
const validate = require('../helper/validate');


const postControllers = require('../controllers/postControllers')


const router = express.Router();


router.post('/savePost', isAuth, [
    check('components').custom(components => {
        if (!components.length)
            throw new Error('Post have no components');
        else
            return true;
    }),
    check('title', "Title is required.").notEmpty()
], validate, postControllers.savePost);

router.post('/updatePost', isAuth, validateObjectID("postId"), [
    check('components').custom(components => {
        if (!components.length)
            throw new Error('Post have no components');
        else
            return true;
    }),
    check('title', "Title is required.").notEmpty()
], validate, postControllers.updatePost);

router.post('/deletePost', isAuth, validateObjectID("postId"), validate, postControllers.deletePost);

router.get('/getPost/:id', validateObjectID("id"), validate, postControllers.getPost); // isAuth

router.get('/getPosts', [check("page").notEmpty()], validate, postControllers.getMultiplePosts);

router.get('/getUserPosts', isAuth, validateObjectID("postId"), [check("page").notEmpty()],
    validate, postControllers.getUserPosts
);

router.get('/getUserDetails', isAuth, validateObjectID("userID"), validate, postControllers.getUserDetails);


module.exports = router;