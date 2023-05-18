const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const connectDB = require('./db');
const User = require('./models/User');

// Define your GraphQL schema
const typeDefs = gql`
  type users {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): users!
    getAllUsers: [users!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): users!
    login(email: String!, password: String!): users!
  }
`;

// In-memory data
// let users = [];

// Define your GraphQL resolvers
const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      return User.find(user => user.id === id);
    },
    getAllUsers: () => {
      return User;
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        // Check if the username or email already exists in the database
        const existingUser = await User.findOne({
          $or: [{ username }, { email }],
        });
        if (existingUser) {
          throw new Error('Username or email already exists');
        }
        // If the username or email is unique, create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        // Check if the usernameOrEmail exists in the database
        const existingUser = await User.findOne({
          $and: [{ email }, { password }],
        });
        if (!existingUser) {
          throw new Error('Invalid email or password');
        }
        // Login successful
        return existingUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

// Connect to MongoDB
connectDB();

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();

  const app = express();

  // Apply ApolloServer as middleware to Express app
  server.applyMiddleware({ app });

  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`GraphQL Playground available at http://localhost:${port}${server.graphqlPath}`);
  });
}

startApolloServer();
