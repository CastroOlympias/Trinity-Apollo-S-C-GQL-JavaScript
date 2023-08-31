const { PantryModel, PantryItemsModel, ImagesModel } = require("../../collections")
const { AuthenticationError } = require('@apollo/server')
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
});



const pantryItemResolvers = {
    // Mutations
    createAPantryItem: async (parent, args, context) => {
        if (context.user) {
            const pantryItem = await PantryItemsModel.create({ ...args, pantryItemUserId: context.user._id })
            await PantryModel.findByIdAndUpdate(
                { _id: args.pantryId },
                { $push: { pantryItems: pantryItem } },
                { new: true },
            )
            const createPlaceholderImage = await ImagesModel.create({ ...args, imagesUserId: context.user._id, imagesSourceId: pantryItem._id })
            await PantryItemsModel.findByIdAndUpdate(
                { _id: pantryItem._id },
                { $push: { pantryItemsImages: createPlaceholderImage } },
                { new: true },
            )
            return pantryItem
        }
        throw new AuthenticationError('You cannot create a pantry item or add it to a pantry');
    },
    editAPantryItem: async (parent, args, context) => {
        if (args.pantryItemUserId == context.user._id) {
            const updatePantryItem = await PantryItemsModel.findOneAndUpdate(
                { _id: args.pantryItemId },
                args,
                { new: true },
            );
            return updatePantryItem
        }
        throw new AuthenticationError("You cannot edit another user's pantry item")
    },
    updatePantryItemImage: async (parent, args) => {
        console.log(args)
        const uploadImage = await PantryItemsModel.findOneAndUpdate(
            { _id: args.pantryItemId, pantryItemUserId: args.pantryItemUserId },
            args,
            { new: true }

        )
        return uploadImage
    },
    movePantryItemToAnotherPantry: async (parent, args, context) => {
        if (args.pantryItemUserId == context.user._id) {
            const movePantryItem = await PantryItemsModel.findOneAndUpdate(
                { _id: args.pantryItemId },
                args,
                { new: true },
            );
            await PantryModel.findByIdAndUpdate(
                { _id: args.previousPantryId },
                { $pull: { pantryItems: args.pantryItemId } },
                { new: true },
            )
            await PantryModel.findByIdAndUpdate(
                { _id: args.pantryId },
                { $pull: { pantryItems: args.pantryItemId } },
                { new: true },
            )
            await PantryModel.findByIdAndUpdate(
                { _id: args.pantryId },
                { $push: { pantryItems: args.pantryItemId } },
                { new: true },
            )
            return movePantryItem
        }
        throw new AuthenticationError("You cannot move another user's pantry")
    },
    deleteAPantryItem: async (parent, args, context) => {

        if (args.pantryItemUserId == context.user._id) {
            const deletePantryItem = await PantryItemsModel.findOneAndDelete({
                _id: args.pantryItemId
            })
            await PantryModel.findByIdAndUpdate(
                { _id: args.pantryId },
                { $pull: { pantryItems: deletePantryItem._id } },
                { new: true }
            )


            console.log(args.s3bucketImageKey_Name)
            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: args.s3bucketImageKey_Name
            };
            s3.deleteObject(params, (error, data) => { })






            return deletePantryItem;
        }
        throw new AuthenticationError("You cannot delete another user's pantry item")
    },
    deleteAllPantryItems: async (parent, args, context) => {
        if (args.pantryItemUserId == context.user._id) {
            const deletePantryItem = await PantryItemsModel.deleteMany({
                _id: args.pantryItemId
            })
            await PantryModel.findByIdAndUpdate(
                { _id: args.pantryItemId },
                { $pull: { pantryItems: deletePantryItem.pantryItemId } },
                { new: true }
            )
            return deletePantryItem;
        }
        throw new AuthenticationError("You cannot delete another user's pantry item")
    },
    // Queries
    veiwAllMyPantryItems: async (parent, args, context) => {
        if (context.user) {
            const allMyPantryItems = PantryItemsModel.find({ pantryItemUserId: context.user._id }).sort({ pantryItemName: 'asc', UTCCreatedAtFullDateAndTime: 'asc' })
            return allMyPantryItems
        }
        throw new AuthenticationError("Can't get my pantry items");
    },
    veiwAllPantryItemsFromPantryId: async (parent, args, context) => {
        const getPantryItems = PantryItemsModel.find({ pantryId: args.pantryId }).sort({ pantryItemName: 'asc', UTCCreatedAtFullDateAndTime: 'asc' })
            .populate('pantryItemsImages')
            .limit(args.limit)
            .skip(args.skip)
        return getPantryItems
    },
    viewAllPantryItems: async (parent, args, context) => {

        const test = PantryItemsModel.find()
            .skip(args.cursor)
            .limit(args.first)
        return test
    },
    viewASinglePantryItemById: async (parent, { pantryItemId }) => {
        const pantryItems = PantryItemsModel.findOne({ _id: pantryItemId })
        return pantryItems
    }
}

module.exports = pantryItemResolvers;