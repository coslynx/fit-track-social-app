import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { isValidEmail } from '../../utils/helpers.js';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email) => {
                try {
                    return isValidEmail(email);
                } catch (error) {
                     return false;
                }
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
};


userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.statics.findByEmail = async function(email) {
    try {
        return await this.findOne({ email }).exec();
    } catch(error) {
        console.error('Error finding user by email:', error);
        throw new Error('Failed to find user by email');
    }
};


const User = mongoose.model('User', userSchema);


export default User;
export { userSchema };