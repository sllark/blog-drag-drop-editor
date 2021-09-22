const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Post = require('../models/Post');


exports.savePost = (req, res, next) => {

    const {components, title, featuredImage, postDescription} = req.body;


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


    const {components, title, featuredImage, postDescription, postId} = req.body;


    Post.findOne({_id: postId, userID: req.user.userID})
        .then(post => {

            // if (post.userID.toString() !== req.user.userID.toString()) throw new Error("User does not match.")

            console.log(post);

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


    let postId = req.body.postId;


    Post.findOneAndDelete({_id: postId, userID: req.user.userID})
        .then(deletedPost => {
            res.status(200).json({deletedPost, message: "success"});
        })
        .catch((err) => {
            if (!err.statusCode)
                err.statusCode = 400;
            next(err);
        })

}


exports.getPost = (req, res, next) => {

    const postID = req.params.id;

    Post.findById(postID)
        .populate("userID", "firstName lastName", "User")
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


    let page = Number(req.query.page)

    if (page <= 0) page = 1;


    Post.countDocuments()
        .then(count => {

            Post.find({})
                .select('-components')
                .sort({_id: -1})
                .skip((page - 1) * 10)
                .limit(10)
                .populate("userID", "firstName lastName", "User")
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


exports.getUserPosts = (req, res, next) => {


    let page = Number(req.query.page)

    if (page <= 0) page = 1;

    console.log(req.query)

    Post.countDocuments({userID: req.query.userID})
        .then(count => {

            Post.find({userID: req.query.userID})
                .select('-components')
                .sort({_id: -1})
                .skip((page - 1) * 10)
                .limit(10)
                .populate("userID", "firstName lastName", "User")
                .then(posts => {
                    res.status(200).json({posts: posts, count: count});
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


exports.getUserDetails = (req, res, next) => {


    Post.countDocuments({userID: req.query.userID})
        .then(count => {

            User.findById(req.query.userID)
                .select("firstName lastName")
                .then(user => {
                    res.status(200).json({user, totalPosts: count});
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