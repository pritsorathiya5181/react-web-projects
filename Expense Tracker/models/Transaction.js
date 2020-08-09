const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a postive or negative number']
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);