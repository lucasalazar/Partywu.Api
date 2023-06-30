import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        username: {
            type: String,
            required: true,
            min: 5,
            max: 24,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
        },
        location: String,
        confirmedParties: {
            type: Array,
            default: [],
        },
        description: {
            type: String,
            default: "",
        },
        favoriteDrinks: {
            type: Array,
            default: [],
        },
        birthDate: Date,
        friends: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
