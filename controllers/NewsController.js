require("dotenv").config();
const User = require("../models/UserModel")

exports.getNews = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const categories = user.preferences.length>0? 
                                                    (user.preferences.join(" OR ")) :
                                                    ("general")
        const apiKey = process.env.GNEWS_API_KEY;
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(categories)}&lang=en&token=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GNews API responded with status: ${response.status}`);
        }

        const data = await response.json();

        res.status(200).json({ news: data.articles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news' });
    }
}