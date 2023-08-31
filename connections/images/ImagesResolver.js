const { UserModel, PantryItemsModel, ImagesModel } = require('../../collections')
const { AuthenticationError } = require('@apollo/server')
const fs = require('fs');
const path = require('path');
const imagesResolver = {
    // Mutations
    uploadAnImage: async (parent, args) => {
        console.log(args)
        const uploadImage = await ImagesModel.findOneAndUpdate(
            { _id: args.imagesId },
            args,
            { new: true }

        )

        await PantryItemsModel.findByIdAndUpdate(
            { _id: args.imagesSourceId },
            { $push: { pantryItemsImages: uploadImage } },
            { new: true },
        )


        // const uploadImage = await ImagesModel.create({ imagesUserId: args.imagesUserId, imagesSourceId: args.imagesSourceId, imagesType: args.imagesType, imagesSize: args.imagesSize, imagesFileName: args.imagesFileName, imagesLocation: args.imagesLocation })

        // await PantryItemsModel.findByIdAndUpdate(
        //     { _id: args.imagesSourceId },
        //     { $push: { pantryItemsImages: uploadImage } },
        //     { new: true },
        // )



        // function createNotes(body, notes,) {
        //     const newNotes = body;
        //     notes = args.imagesRawData
        //     fs.writeFileSync(
        //         path.join(__dirname, './imagesdir/test.jpg'),
        //         JSON.stringify({ notes }, null, 2)
        //     );
        //     return newNotes;
        // }

        // createNotes(args.imagesRawData)


        return uploadImage
    },
    // Queries
    viewMyImages: async (parent, args, context) => {
        return ImagesModel.find({ imagesUserId: args.imagesUserId, imagesSourceId: args.imagesSourceId }).sort({ UTCCreatedAtFullDateAndTime: 'desc' })
    },
    viewMySingleIamge: async (parent, args, context) => {
        const findASigleImage = ImagesModel.findOne({ _id: args.imageId })
        return findASigleImage
    }
}

module.exports = imagesResolver