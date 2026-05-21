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
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
       throw error;
    }
});

// Compile the schema into a Model
const User = mongoose.model('User', userSchema);

module.exports = User;
