import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
    targetValue: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


goalSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


goalSchema.statics.findByUserId = async function (userId) {
    try {
        return await this.find({ userId }).exec();
    } catch (error) {
        console.error('Error finding goals by user ID:', error);
        throw new Error('Failed to find goals by user ID');
    }
};


const Goal = mongoose.model('Goal', goalSchema);


export default Goal;
export { goalSchema };