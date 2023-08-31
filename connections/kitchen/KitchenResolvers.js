const { UserModel, KitchenModel } = require('../../collections')
const { AuthenticationError } = require('@apollo/server')
const kitchenResolvers = {
    // Mutations
    editKitchen: async (parent, args, context) => {
        if (context.user) {
            const updateKitchen = await KitchenModel.findOneAndUpdate(
                { _id: args.kitchenId },
                args,
                { new: true }
            )
            return updateKitchen
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    editKitchenThemeSettings: async (parent, args, context) => {
        if (context.user) {
            const updateKitchen = await KitchenModel.findOneAndUpdate(
                { kitchenUserId: context.user._id },
                args,
                { new: true }
            )
            return updateKitchen
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    // Queries
    viewMyKitchen: async (parent, args, context) => {
        if (context.user) {
            return KitchenModel.findOne({ kitchenUserId: context.user._id })
        }
    }
}

module.exports = kitchenResolvers;