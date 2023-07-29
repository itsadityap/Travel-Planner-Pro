//Utils Imports
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

//Model and DTO imports
const AdminModel = require('../../models/admin');
const AdminDTO = require('../../dtos/adminDto');

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

        const admin = new AdminModel(req.body);
        admin.save((err, admin) => {
            if(err)
            {
                if(err.code === 11000)
                {
                    return res.status(400).json({
                        error: `Unable to save Admin, Duplicate '${Object.keys(err.keyValue)[0]}' found`
                    });
                }
            }

            const token = jwt.sign({adminID: admin._id, adminName: admin.name, adminEmail: admin.email, role:"Admin"}, process.env.SECRET)

            // Put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});
            
            res.json({
                token: token,
                admin: new AdminDTO(admin)
            });
        });

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error, while creating admin"
        });
    }
}

exports.signin = async (req, res) => {
    try
    {
        const {email, password} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            console.log(errors.array());
            return res.status(422).json({
                error: errors.array()[0].msg,
                param: errors.array()[0].param,
            });
        }

        AdminModel.findOne({email}, (err, admin) => {
            if(err || !admin)
            {
                return res.status(400).json({
                    error: "Admin email does not exists"
                });
            }

            if(!admin.authenticate(password))
            {
                return res.status(401).json({
                    error: "Email and password do not match"
                });
            }

            // Create token
            const token = jwt.sign({adminID: admin._id, adminName: admin.name, adminEmail: admin.email, role:"Admin"}, process.env.SECRET)

            // Put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});

            //Send response to front end
            const {_id, name, email} = admin;
            return res.json({
                token,
                admin: new AdminDTO({_id, name, email})
            });
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: "Internal Server Error, while signing in"
        });
    }
}

exports.signout = async (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "User signout successfully"
    });
}