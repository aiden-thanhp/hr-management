const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
    username: {
        type: String, 
        required: [true, 'User username required'],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]{4,16}$/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
        }
    },
    email: { 
        type: String, 
        required: [true, 'User email required'],
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { 
        type: String, 
        required: [true, 'User password required']
    },
    isHR: {
        type: Boolean,
        default: false,
    },
    profile: { type: refType, ref: "Profile" },
    house: { type: refType, ref: "House" }
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;