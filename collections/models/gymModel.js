const { Schema, model } = require('mongoose')

const gymSchema = new Schema(
    {
        gymUserId: {
            type: String
        },
        gymBackdropTheme: {
            type: String,
            default: 'cyanBrightCyanDark'
        },
        gymDashboardTheme: {
            type: String,
            default: 'redBlackRed'
        },
        gymFontColor: {
            type: String,
            default: 'cyanBrightCyanDark'
        },
        actionBarButtonsTheme: {
            type: String,
            default: 'brightRedDarkRed'
        },
    }
)

const GymModel = model('GymModel', gymSchema)
module.exports = GymModel