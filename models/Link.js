const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clickSchema = new Schema({
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    targetParamValue: { type: String }
});

const targetValueSchema = new Schema({
    name: { type: String },
    value: { type: String }
})

const linkSchema = new Schema({
    originalUrl: { type: String, required: true },
    clicks: [clickSchema],
    targetParamName: { type: String },
    targetValues: [targetValueSchema]
});

module.exports = mongoose.model('Link', linkSchema);
