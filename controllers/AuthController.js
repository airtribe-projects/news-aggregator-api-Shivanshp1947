const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signup = async (req, res) => {
    const { name, email, password, preferences } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    try{
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            preferences: preferences || []
        });
        await newUser.save();
        return res.status(200).json({ message: 'User registered successfully.' });
    }catch(err){
        return res.status(500).json({ message: 'Error Registering User' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email please enter valid email' });
        }

        const isPasswordValid = await bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Password while login"})
        }else{
            const token=  jwt.sign(
                {
                    id:user._id,
                    email:user.email
                },
                process.env.JWT_SECRET,
                {expiresIn:"1h"}
            )
            return res.status(200).json({token})
        }
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

module.exports = {signup,login}