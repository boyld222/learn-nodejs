import User from "../models/User.js";

export const getAllUser = (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
};

export const getUserById = (req, res) => {
    const userId = req.params.id;
    
    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid user ID format' });
            }
            res.status(500).json({ message: 'Error fetching user', error: err.message });
        });
};