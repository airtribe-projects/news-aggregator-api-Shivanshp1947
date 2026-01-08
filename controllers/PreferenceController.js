const User = require('../models/UserModel');

exports.getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ preferences: user.preferences }); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preferences' });
    }
};

exports.updatePreferences = async (req, res) => {
    try {
        const {preferences} = req.body;
        const user = await User.findByIdAndUpdate(req.user.id,
            { preferences },
            { new: true }
        )
        res.status(200).json({
            message: "Preferences updated", 
            preferences: user.preferences
        })
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences' });
    }
};