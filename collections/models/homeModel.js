const { Schema, model } = require('mongoose')

const homeSchema = new Schema(
    {
        homeUserId: {
            type: String
        },
        homeBackdropTheme: {
            type: String,
            default: 'redBlackRed'
        },
        homeDashboardTheme: {
            type: String,
            default: 'darkSilver'
        },
        homeFontColor: {
            type: String,
            default: 'redBlackRed'
        },
        actionBarButtonsTheme: {
            type: String,
            default: 'silver'
        },
    }
)

const HomeModel = model('HomeModel', homeSchema)
module.exports = HomeModel