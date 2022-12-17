const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model("todolist",UserSchema);
module.exports = UserModel;