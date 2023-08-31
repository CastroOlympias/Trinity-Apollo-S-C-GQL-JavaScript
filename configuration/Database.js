const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trinity', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // This add family: 4, enabled node js 18.12 to connect to the database, was receiving a 500 internal error.
        // MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
        // fix found at https://stackoverflow.com/questions/69840504/mongooseserverselectionerror-connect-econnrefused-127017
        family: 4,
})
.then(db => console.log('DB is connected'))
// .catch(err => console.log(err));
// // Use this to log mongo queries being executed!
// mongoose.set('debug', true)
module.exports = mongoose.connection;