const { UserModel, MacroDashboardModel, HomeModel, KitchenModel, GymModel, CommentsModel, RepliesModel, PantryModel, MealsModel, PantryItemsModel, MealItemsModel, ImagesModel } = require('../../collections');
const { signToken } = require('../../configuration/Authentication')
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('@apollo/server')

const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        accessToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

// let mailOptions = {
//     from: '',
//     to: 'blackcarrera@msn.com',
//     subject: 'Trinty',
//     text: 'Sent from Trinty Project @ 17:59 from the UserResolvers'
// };

// transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//         console.log("Error " + err);
//     } else {
//         console.log("Email sent successfully");
//     }
// });

// https://developers.google.com/gmail/api/quickstart/nodejs

const userResolvers = {
    // Mutations
    createAUser: async (parent, args) => {
        const user = await UserModel.create(args);
        const token = signToken(user);
        const createHome = await HomeModel.create({ ...args, homeUserId: user._id })
        await UserModel.findByIdAndUpdate(
            { _id: user._id },
            { $push: { userHome: createHome } },
            { new: true }
        )
        const createKitchen = await KitchenModel.create({ ...args, kitchenUserId: user._id })
        await UserModel.findByIdAndUpdate(
            { _id: user._id },
            { $push: { userKitchen: createKitchen } },
            { new: true }
        )
        const createGym = await GymModel.create({ ...args, gymUserId: user._id })
        await UserModel.findByIdAndUpdate(
            { _id: user._id },
            { $push: { userGym: createGym } },
            { new: true }
        )

        let mailOptions = {
            from: '',
            to: args.eMail,
            bcc: process.env.BCC,
            subject: 'Signup confirmation at Trinity-Focus-Energy',
            text: `Thank you for signing up at, Trinity-Focus-Energy. Your username: ${args.userName}, eMail: ${args.eMail} and user ID ${user._id}. This is my first solo full tack project since graduating the UofU coding bootcamp in 21`
        };
        sendEmailConfirmation(mailOptions)
        return { token, user, createKitchen }
    },
    loginToAUser: async (parent, { eMail, password }) => {
        const user = await UserModel.findOne({ eMail });
        if (!user) {
            throw new AuthenticationError('Invalid credentials');
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
            throw new AuthenticationError('Invalid credentials');
        }
        const token = signToken(user);
        return { token, user };
    },
    changeAUsereMailOrPassword: async (parent, args, context) => {
        if (context.user) {
            const findUser = await UserModel.findOne({ eMail: args.eMail })
            const saltRounds = 10;
            findUser.password = await bcrypt.hash(args.password, saltRounds);
            const token = signToken(findUser);
            args.password = findUser.password


            const user = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true });
            return { token, user };
        }
    },
    editAUser: async (parent, args, context) => {
        if (context.user) {
            const user = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true });
            await KitchenModel.deleteMany({
                kitchenUserId: context.user._id
            })
            await CommentsModel.deleteMany({
                commentUserId: context.user._id
            });
            await RepliesModel.deleteMany({
                replyUserId: context.user._id
            });
            await PantryModel.deleteMany({
                pantryUserId: context.user._id
            });
            await PantryItemsModel.deleteMany({
                pantryItemUserId: context.user._id
            })
            await MealsModel.deleteMany({
                mealUserId: context.user._id
            })
            await MealItemsModel.deleteMany({
                mealItemsUserId: context.user._id
            })
            return user;
        }
        throw new AuthenticationError('You must be logged in to edit your profile');
    },
    editUserThemeSettings: async (parent, args, context) => {
        if (context.user) {
            const user = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true });
            return user;
        }
        throw new AuthenticationError('You must be logged in to edit your profile');
    },
    editRenderringType: async (parent, args, context) => {
        const renderSettings = await UserModel.findOneAndUpdate(
            { _id: context.user._id },
            args,
            { new: true });
    },
    deleteAUser: async (parent, { userId }, context) => {

        if (context.user) {

            const user = await UserModel.findOneAndDelete({
                _id: userId
            })
            await HomeModel.deleteMany({
                homeUserId: context.user._id
            })
            await KitchenModel.deleteMany({
                kitchenUserId: context.user._id
            })
            await GymModel.deleteMany({
                gymUserId: context.user._id
            })
            await CommentsModel.deleteMany({
                commentUserId: context.user._id
            });
            await RepliesModel.deleteMany({
                replyUserId: context.user._id
            });
            await PantryModel.deleteMany({
                pantryUserId: context.user._id
            });
            await PantryItemsModel.deleteMany({
                pantryItemUserId: context.user._id
            })
            await MealsModel.deleteMany({
                mealUserId: context.user._id
            })
            await MealItemsModel.deleteMany({
                mealItemsUserId: context.user._id
            })
            await ImagesModel.deleteMany({
                imagesUserId: context.user._id
            })
            return user;
        }
        throw new AuthenticationError('You must be logged in to delete your profile')
    },
    deleteAllUsers: async (parent, args) => {
        const deleteAllUsers = await UserModel.deleteMany()
        await HomeModel.deleteMany()
        await KitchenModel.deleteMany()
        await GymModel.deleteMany()
        await CommentsModel.deleteMany();
        await RepliesModel.deleteMany();
        await PantryModel.deleteMany();
        await PantryItemsModel.deleteMany()
        await MealsModel.deleteMany()
        await MealItemsModel.deleteMany()
        await ImagesModel.deleteMany()
        return deleteAllUsers
    },
    friendAUser: async (parent, args, context) => {
        if (context.user._id) {
            const addFriend = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: args.friendId } },
                { new: true }
            )
            return addFriend;
        }
    },
    blockAUser: async (parent, args, context) => {
        if (context.user._id) {
            const blockFrenemy = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { blocked: args.blockedId } },
                { new: true }
            )
            return blockFrenemy
        }
    },

    // Queries
    findMyIdAndName: async (parent, args, context) => {

        const userData = await UserModel.findOne({ _id: context.user._id })
            .select('-__v -password')
        return userData;

    },
    findMe: async (parent, args, context) => {
        const userData = await UserModel.findOne({ _id: args._id })
        return userData;
    },
    findMySettings: async (parent, args, context) => {
        return UserModel.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('userHome')
            .populate('userKitchen')
            .populate('userGym')

    },
    findAllUsers: async (parent, args, context) => {
        const allUserData = await UserModel.find()
        // .select('-__v, -password')

        return allUserData
    },
    findAllUsersBySameName: async (parent, { userName }) => {
        return UserModel.find({ userName }).sort({ eMail: 'asc' })
            .select('-__v -password')
    },
    findAllUsersBySecretCode: async (parent, { findMeFriend }) => {
        return UserModel.find({ findMeFriend })
            .select('-__v -password')
    },
    findAUserById: async (parent, { userId }) => {
        return UserModel.findOne({ _id: userId })
            .select('-__v -password')
    },
    findAUserByEmail: async (parent, { eMail }) => {
        return UserModel.findOne({ eMail })
            .select('-__v -password')
    },
}


const sendEmailConfirmation = (mailOptions) => {
    transporter.set("oauth2_provision_cb", (user, renew, callback) => {
        let accessToken = userTokens[user];
        if (!accessToken) {
            return callback(new Error("Unknown user"));
        } else {
            return callback(null, accessToken);
        }
    });

    transporter.on("token", (token) => {
        console.log("A new access token was generated");
        console.log("User: %s", token.user);
        console.log("Access Token: %s", token.accessToken);
        console.log("Expires: %s", new Date(token.expires));
    });
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++', mailOptions)
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });


}


module.exports = userResolvers;

// setup for Apollo Studio Sandbox
// Headers [Authorization] [Breaer {{token}}]
// Environment varabiles json, without the slashes of course
//{
    //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJOYW1lIjoiQ2FzdHJvIE9seW1waWFzIiwiZU1haWwiOiJjYXN0cm9fb2x5bXBpYXNAbXNuLmNvbSIsIl9pZCI6IjYzZWM0NzIzZjhmNmFhZTI3NDgzNGUxMiJ9LCJpYXQiOjE2Nzk1MzIxMTEsImV4cCI6MTY3OTcwNDkxMX0.qblMncYhrmfd0YGu_tCQoEEmV4ozo6etewRwPcl0GRE"
//}