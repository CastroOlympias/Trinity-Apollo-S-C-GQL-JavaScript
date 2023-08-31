// const express = require('express');
// const mongoose = require('mongoose');
// const http = require('http')

// const app = express();
// const PORT = process.env.PORT || 3000;
// const HOST_IP = '10.0.0.20'
// const httpServer = http.createServer(app);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         // This add family: 4, enabled node js 18.12 to connect to the database, was receiving a 500 internal error.
//         // MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
//         // fix found at https://stackoverflow.com/questions/69840504/mongooseserverselectionerror-connect-econnrefused-127017
//         family: 4,
// }).then(db => console.log('DB is connected'))

// // Use this to log mongo queries being executed!
// mongoose.set('debug', true);

// app.use(require('./routes'));

// // in your command prompt type ipconfig to find host server IP address, it'll be IPv4 Address
// httpServer.listen(PORT, HOST_IP, () => {
//         console.log(`Server running at http://${HOST_IP}:${PORT}`)
// });



const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const express = require('express')
const http = require('http')
const { typeDefs, resolvers } = require('./connections/index.js')
const db = require('./configuration/Database.js')
const path = require('path')
const { authMiddleware } = require('./configuration/Authentication.js')
const imageRoutes = require('./routes/image-upload')

const PORT = process.env.PORT || 3000;
// in your command prompt type ipconfig to find host server IP address, it'll be IPv4 Address
const HOST_IP = '10.0.0.20'

async function startApolloServer() {
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
                typeDefs,
                resolvers,
                plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        await server.start();
        app.use(express.urlencoded({ extended: false }));
        app.use(
                '/graphql',
                express.json(),
                expressMiddleware(server, {
                        context: authMiddleware
                }),
        );
        app.use(express.static('client'));
        app.use('/api/', imageRoutes); // add this route for image upload
        if (process.env.NODE_ENV === 'production') {
                app.use(express.static(path.join(__dirname, './client/build')));
        }
        app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, './client/index.html'));
        })
        db.once('open', () => { });
        await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`
############################################################################################
#                                                                                          #
#  🚀🌍 Apollo Server Studio Sandbox: http://localhost:${PORT}/graphql                        #
#  🚀🌍 Local Host http://localhost:${PORT}                                                   #
#  🚀🌍 HTTP server for devices on the same network http://${HOST_IP}:${PORT}                  #
#  NOTE: In the CMD prompt, type, 'ipconfig', to find the IPv4 Address for an HTTP server  #
#  as this will allow other devices on the same network to connect to the host server.     #
#                                                                                          #
############################################################################################
`);
}
startApolloServer();