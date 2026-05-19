const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre('save', async function(){
    try {
        // Check if the password has been modified
        if (!this.isModified('password')) return;
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
       throw error;
    }
});

// Compile the schema into a Model
const User = mongoose.model('User', userSchema);

module.exports = User;
