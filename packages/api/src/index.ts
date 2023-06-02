const express = require('express');
const { ApolloServer } = require('apollo-server-express');
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const PORT = 3000;

async function startServer() {
  const app = express();

  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
