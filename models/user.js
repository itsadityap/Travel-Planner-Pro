const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    encrypted_password: {
        type: String,
        min: 6,
        required: true,
    },
}, {timestamps: true});

userSchema.set("toJSON", {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

// Virtual field for actual pasword.
userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encrypted_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

// Custom methods for User Schema.
userSchema.methods = {

    // Authenticate by verifying password.
    authenticate: function(plainpassword) 
    {
        return bcrypt.compareSync(plainpassword, this.encrypted_password);
    },

    // Encrypt the plain password and store it in the
    // encrypted_password field.
    securePassword: function(plainpassword) {
        if(!plainpassword) return "";
        try {
            return bcrypt.hashSync(plainpassword, 8);
        } catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);
