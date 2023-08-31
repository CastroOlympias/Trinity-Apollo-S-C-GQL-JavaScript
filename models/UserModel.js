const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const UTCDateFormatter = require('../utils/UTCDateFormatter');

const userSchema = new Schema(

    {
        // Document User Data
        UTCCreatedAtTime: {
            type: Date,
            default: Date.now,
            get: time => UTCDateFormatter(time)[0]
        },
        UTCCreatedAtDate: {
            type: Date,
            default: Date.now,
            get: date => UTCDateFormatter(date)[1]
        },
        UTCCreatedAtMonth: {
            type: Date,
            default: Date.now,
            get: UTCMonth => UTCDateFormatter(UTCMonth)[2]
        },
        UTCCreatedAtYear: {
            type: Date,
            default: Date.now,
            get: UTCYear => UTCDateFormatter(UTCYear)[3]
        },
        eMail: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            match: [/.+@|..+/, 'You must use a valid eMail address']
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true,
            minlength: [8, 'Your password needs to be at least 8 characters long']
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const UserModel = model('UserModel', userSchema);
module.exports = UserModel;