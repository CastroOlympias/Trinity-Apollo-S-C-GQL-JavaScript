const { UserModel, GymModel } = require('../../collections')
const { AuthenticationError } = require('@apollo/server')
const GymResolvers = {
    // Mutations
    editGym: async (parent, args, context) => {
        if (context.user) {
            const updategym = await GymModel.findOneAndUpdate(
                { _id: args.gymId },
                args,
                { new: true }
            )
            return updategym
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    editGymThemeSettings: async (parent, args, context) => {
        if (context.user) {
            const updategym = await GymModel.findOneAndUpdate(
                { gymUserId: context.user._id },
                args,
                { new: true }
            )
            return updategym
        }
        throw new AuthenticationError("You Must be logged in to create a pantry item");
    },
    // Queries
    viewMyGym: async (parent, args, context) => {
        if (context.user) {
            return GymModel.findOne({ gymUserId: context.user._id })
        }
    }
}

module.exports = GymResolvers;