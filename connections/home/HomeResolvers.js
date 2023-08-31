const { UserModel, HomeModel } = require('../../collections')
const { AuthenticationError } = require('@apollo/server')
const HomeResolvers = {
    // Mutations
    editHome: async (parent, args, context) => {
        if (context.user) {
            const updateHome = await HomeModel.findOneAndUpdate(
                { _id: args.homeId },
                args,
                { new: true }
            )
            return updateHome
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    editHomeThemeSettings: async (parent, args, context) => {
        if (context.user) {
            const updateHome = await HomeModel.findOneAndUpdate(
                { homeUserId: context.user._id },
                args,
                { new: true }
            )
            return updateHome
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    // Queries
    viewMyHome: async (parent, args, context) => {
        if (context.user) {
            return HomeModel.findOne({ homeUserId: context.user._id })
        }
    }
}

module.exports = HomeResolvers;