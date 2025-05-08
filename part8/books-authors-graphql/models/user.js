const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
    friends: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
        }
    ]
});

module.exports = mongoose.model('User', userSchema, 'users'); // 'users' is the name of the collection in the database. The third argument is optional and can be omitted if the collection name is the same as the model name.