import '@babel/polyfill';
import { PrismaClient } from '@prisma/client';
import { GraphQLServer, PubSub } from 'graphql-yoga';
import dotenv from 'dotenv';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';

dotenv.config({ path: './config.env' });

const prisma = new PrismaClient();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
  },
  context(request) {
    return {
      prisma,
      pubsub,
      request,
    };
  },
});

server.start({ port: process.env.PORT || 4000 }, ({ port }) => {
  console.log(
    `Graphql Server up, listening on port ${port} for incoming requests.`
  );
});
