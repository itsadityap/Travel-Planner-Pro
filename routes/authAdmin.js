const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signout , signup , signin } = require('../controllers/admin/authAdmin');

router.post('/signup',[
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
], signup);

router.post('/signin',[
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
], signin);

router.get('/signout', signout);

module.exports = router;