const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Post = require('../models/Post');


exports.savePost = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;

    }


    const {components, title, featuredImage, postDescription} = req.body;


    // console.log('req.body=  ', req.body);
    // console.log('components=  ', components);

    let newPost = new Post({
        components: components,
        title: title,
        featuredImage: featuredImage,
        description: postDescription,
        userID: req.user.userID
    })


    newPost.save()
        .then(post => {
            console.log(post);
            res.status(200).json({id: post._id});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })


}


exports.updatePost = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;

    }


    const {components, title, featuredImage, postDescription, postId} = req.body;


    Post.findById(postId)
        .then(post => {
            post.components = components;
            post.title = title;
            post.featuredImage = featuredImage;
            post.description = postDescription;

            return post.save();
        })
        .then(post => {
            res.status(200).json({id: post._id});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })


}

exports.deletePost = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;

    }


    let postId = req.body.postId;


    Post.findOneAndDelete({_id: postId, userID: req.user.userID})
        .then(deletedPost => {
            res.status(200).json({deletedPost, message: "success"});
        })

}


exports.getPost = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;

    }


    const postID = req.params.id;


    Post.findById(postID)
        .populate("userID","firstName lastName","User")
        .then(post => {

            res.status(200).json({post: post});

        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })


}


exports.getMultiplePosts = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;
    }

    let page = Number(req.query.page)

    if (page <= 0) page = 1;


    Post.countDocuments()
        .then(count => {

            Post.find({})
                .select('-components')
                .sort({_id: -1})
                .skip((page - 1) * 10)
                .limit(10)
                .populate("userID","firstName lastName","User")
                .then(posts => {
                    res.status(200).json({posts: posts, count: count});
                })
                .catch(err => {
                    if (!err.statusCode)
                        err.statusCode = 500;
                    next(err);
                })


        })

}


exports.getMyPosts = (req, res, next) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        let errors = validation.array();

        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        error.errors = errors;
        throw error;
    }

    let page = Number(req.query.page)

    if (page <= 0) page = 1;


    Post.countDocuments({userID: req.user.userID})
        .then(count => {

            Post.find({userID: req.user.userID})
                .select('-components')
                .sort({_id: -1})
                .skip((page - 1) * 10)
                .limit(10)
                .populate("userID","firstName lastName","User")
                .then(posts => {
                    res.status(200).json({posts: posts, count: count, user: req.user});
                })
                .catch(err => {
                    if (!err.statusCode)
                        err.statusCode = 500;
                    next(err);
                })


        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })

}