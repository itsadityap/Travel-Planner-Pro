//Utils Imports
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//Model and DTO imports
const UserModel = require('../models/user');
const UserDTO = require('../dtos/userDto');

exports.signup = async (req, res) => {
    try
    {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(422).json({
                error: errors.array()[0].msg,
                param: errors.array()[0].param,
            });
        }

        const user = new UserModel(req.body);
        user.save((err, user) => {
            if(err)
            {
                if(err.code === 11000)
                {
                    return res.status(400).json({
                        error: `Unable to save User, Duplicate '${Object.keys(err.keyValue)[0]}' found`
                    });
                }
            }

            const token = jwt.sign({userID: user._id, userName: user.userName, name:user.name, email:user.email, role:"User"}, process.env.SECRET)

            // Put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});

            res.json({
                user: new UserDTO(user),
                token: token
            });
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: "Internal Server Error, while creating user"
        });
    }
}

exports.signin = async (req, res) => 
{
    try
    {
        const {email, password} = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(422).json({
                error: errors.array()[0].msg,
                param: errors.array()[0].param,
            });
        }

        UserModel.findOne({email}, (err, user) => {
            if(err || !user)
            {
                return res.status(400).json({
                    error: "User does not exists"
                });
            }

            if(!user.authenticate(password))
            {
                return res.status(401).json({
                    error: "Wrong Credentials, Please try again"
                });
            }

            const token = jwt.sign({userID: user._id, userName: user.userName, name:user.name, email:user.email, role:"User"}, process.env.SECRET)

            // Put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});

            const {_id, userName, name, email} = user;
            return res.status(200).json({
                token,
                user: new UserDTO({_id, userName, name, email})
            });
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message: "Internal Server Error, while signing in user"
        });
    }
}

exports.signout = async (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signout successfully"
    });
}