const { Schema, model } = require('mongoose')

const kitchenSchema = new Schema(
    {
        kitchenUserId: {
            type: String
        },
        kitchenBackdropTheme: {
            type: String,
            default: 'cyanMagentaOrange'
        },
        kitchenDashboardTheme: {
            type: String,
            default: 'glassWhiteBrighterFrost'
        },
        kitchenFontColor: {
            type: String,
            default: 'cyanMagentaOrange'
        },
        actionBarButtonsTheme: {
            type: String,
            default: 'brightRedDarkRed'
        },
        pantries: [{
            type: Schema.Types.ObjectId,
            ref: 'PantryModel'
        }],
        totalPantries: {
            type: Number,
            default: 0
        },
        totalPantryItems: {
            type: Number,
            default: 0
        },
        totalPantryItemsCost: {
            type: Number,
            default: 0
        },

    }
)

const KitchenModel = model('KitchenModel', kitchenSchema)
module.exports = KitchenModel