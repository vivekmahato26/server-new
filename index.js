const express = require("express");
const { json, urlencoded } = require("express");
const { ApolloServer } = require("apollo-server-express");
var request = require("request");
const axios = require("axios");
const cors = require("cors");


const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }))

const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");
const auth = require("./middlewares/auth");

// For vdoCipher

app.use(cors());



// *****************************************


app.use(cookieParser())


app.use(auth);

const startServer = async () => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req, res }) => {
      return { req, res }
    }
  });
  const cors = {
    credentials: true,
    origin: '*'
  }


  await server.start();
  server.applyMiddleware({ app, path: "/", cors });
};

startServer();
app.listen(8000, () => console.log("server running at port 8000🚀"));
