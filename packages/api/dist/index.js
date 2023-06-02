"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const PORT = 3000;
async function startServer() {
    const app = express();
    // Create an Apollo Server instance
    const server = new ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
    });
    // Await server.start() before calling server.applyMiddleware()
    await server.start();
    // Apply the Apollo Server middleware to Express
    server.applyMiddleware({ app });
    // Start the server
    app.listen(PORT, () => {
        console.log(`Backend server with GraphQL listening on port ${PORT}`);
    });
}
startServer().catch((error) => {
    console.error('Error starting server:', error);
});
