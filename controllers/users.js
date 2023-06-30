import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await User.find({ _id: { $in: user.friends } });
        const formatedFriends = friends.map((friend) => {
            const { _id, firstName, lastName, username, picturePath } = friend;
            return { _id, firstName, lastName, username, picturePath };
        }
        );
        
        res.status(200).json(formatedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }   
};

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
            friend.friends.push(id);
        } else {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        await user.save();
        await friend.save();

        const friends = await User.find({ _id: { $in: user.friends } });
        const formatedFriends = friends.map((friend) => {
            const { _id, firstName, lastName, username, picturePath } = friend;
            return { _id, firstName, lastName, username, picturePath };
        });

        res.status(200).json(formatedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
