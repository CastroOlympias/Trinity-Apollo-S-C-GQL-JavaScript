module.exports = {
    Model: `
    type ImagesModel {
        UTCCreatedAtFullDateAndTime: String
        UTCCreatedAtTime: String
        UTCCreatedAtDate: String
        UTCCreatedAtMonth: String
        UTCCreatedAtYear: String
        _id: ID
        imagesUserId: String
        imagesSourceId: String
        imagesType: String
        imagesSize: Float
        imagesFileName: String
        imagesLocation: String
        s3bucketImageKey_Name: String
        imagesRawData: String
    }
    `,
    Mutations: `
    uploadAnImage(imagesId: ID, imagesUserId: String, imagesSourceId: String, imagesType: String, imagesSize: Float, imagesFileName: String, imagesLocation: String, s3bucketImageKey_Name: String): ImagesModel
    `,
    Queries: `
    viewMyImages(imagesUserId: String, imagesSourceId: String): [ImagesModel]
    viewMySingleIamge(imageId: ID): ImagesModel
    `,
}