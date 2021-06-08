const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');


// @route    POST api/users
router.post('/', 

//validtion for user sign Up
    [   
        check('name', 'Required field: Name').notEmpty(),
        check('email', 'Email is not valid ').isEmail(),
        //check('password','Paswword is not valid').isStrongPassword(),
    ],

// return value from post reqest
async (req,res)=> { 
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        //Check if the user exict
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
           }

        // Get user gravatar
        const avatar = normalize(
        gravatar.url(email, {
           s: '200',
           r: 'pg',
           d: 'mm'
           }),
         { forceHttps: true }
        );
        user = new User({
          name,
          email,
          avatar,
          password
        });
      
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return json web token
        const payload = {
            user: {
              id: user.id
            }
          };
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );

        }catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
});



module.exports = router;
