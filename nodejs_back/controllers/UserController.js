const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, password, email} =  req.body;
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('All fields required');
    }
    const userByEmail = await User.findOne({email});
    if (userByEmail){
        res.status(400);
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = User.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({_id: user.id, email: user.email, username: user.username});
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password){
        res.status(400);
        throw new Error ("Username and password are required");
    }
    const user = await User.findOne({username});
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email : user.email,
                    id: user.id,
                },

            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30m"} 
        );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Wrong credentials");
    }
})


//@desc logged user
//@route GET /api/users/logged-user
//@access private
const loggedUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})





module.exports = {registerUser, loginUser, loggedUser};