const UserModel = require('./models/UserModel');
const ImagesModel = require('./models/ImagesModel')
const MacroDashboardModel = require('./models/MacroDashboardModel')
const HomeModel = require('./models/homeModel')
const KitchenModel = require('./models/KitchenModel')
const GymModel = require('./models/gymModel')
const PantryModel = require('./models/PantryModel')
const PantryItemsModel = require('./models/PantryItemsModel')
const MealsModel = require('./models/MealsModel')
const MealItemsModel = require('./models/MealItemsModel')
const CommentsModel = require('./models/CommentsModel')
const RepliesModel = require('./models/RepliesModel')
const RepliesSchema = require('./schemas/RepliesSchema')

module.exports = { UserModel, ImagesModel, MacroDashboardModel, HomeModel, KitchenModel, GymModel, PantryModel, PantryItemsModel, MealsModel, MealItemsModel, CommentsModel, RepliesModel, RepliesSchema };