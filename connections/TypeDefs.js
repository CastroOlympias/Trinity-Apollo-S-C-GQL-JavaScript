const User = require('./users/UserTypes')
const Images = require('./images/ImagesTypes')
const MacroNutrients = require('./macroNutrients/MacroNutrientTypes')
const Home = require('./home/HomeTypes')
const Kitchen = require('./kitchen/KitchentTypes')
const Gym = require('./gym/GymTypes')
const Comments = require('./comment/CommentTypes')
const Replies = require('./replies/RepliesTypes')
const Pantry = require('./pantry/PantryTypes')
const PantryItems = require('./pantryItems/PantryItemsTypes')
const Meals = require('./meals/MealTypes')
const MealItems = require('./mealItems/MealItemsTypes')

const typeDefs = `#graphql
${User.Model}
${Images.Model}
${MacroNutrients.Model}
${Home.Model}
${Kitchen.Model}
${Gym.Model}
${Comments.Model}
${Replies.Model}

type RepliesSchema {
    commentUserId: ID
    replyUserId: ID
    replyUserName: String
    UTCCreatedAtTime: String
    UTCCreatedAtDate: String
    UTCCreatedAtMonth: String
    UTCCreatedAtYear: String
    _id: ID
    replyText: String
}

${Pantry.Model}
${PantryItems.Model}
${Meals.Model}
${MealItems.Model}

type Auth {
    token: ID
    user: UserModel
}
type Mutation {
    ${User.Mutations}
    ${Images.Mutations}
    ${Home.Mutations}
    ${Kitchen.Mutations}
    ${Gym.Mutations}
    ${Comments.Mutations}
    ${Replies.Mutations}
    ${Pantry.Mutations}
    ${PantryItems.Mutations}
    ${Meals.Mutations}
    ${MealItems.Mutations}
}
type Query {
    ${User.Queries}
    ${Images.Queries}
    ${Home.Queries}
    ${Kitchen.Queries}
    ${Gym.Queries}
    ${Comments.Queries}
    ${Replies.Queries}
    ${Pantry.Queries}
    ${PantryItems.Queries}
    ${Meals.Queries}
    ${MealItems.Queries}
}
`
module.exports = typeDefs;