const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const UTCDateFormatter = require('../../configuration/UTCDateFormatter');

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
        birthDate: {
            type: Date,
            required: true,
            get: UTCYear => UTCDateFormatter(UTCYear)[1]
        },
        renderActionBar: {
            type: Boolean,
            default: true
        },
        useGlobalTheme: {
            type: Boolean,
            default: false
        },
        highEfficiencyRenderring: {
            type: Boolean,
            default: true
        },
        hideScrollTrackerDisplayBox: {
            type: Boolean,
            default: true
        },
        // Relational Document Data
        userMacroDashboard: [{
            type: Schema.Types.ObjectId,
            ref: 'MacroDashboardModel'
        }],
        userHome: [{
            type: Schema.Types.ObjectId,
            ref: 'HomeModel'
        }],
        userKitchen: [{
            type: Schema.Types.ObjectId,
            ref: 'KitchenModel'
        }],
        userGym: [{
            type: Schema.Types.ObjectId,
            ref: 'GymModel'
        }],
        userPantry: [{
            type: Schema.Types.ObjectId,
            ref: 'PantryModel'
        }],
        userMeals: [{
            type: Schema.Types.ObjectId,
            ref: 'MealsModel'
        }],
        userComments: [{
            type: Schema.Types.ObjectId,
            ref: 'CommentsModel'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }],
        blocked: [{
            type: Schema.Types.ObjectId,
            ref: 'UserModel'
        }],
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