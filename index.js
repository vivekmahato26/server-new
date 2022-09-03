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

app.post("/getCreds", async (req, res) => {
  try {
    const data = await axios.put("https://dev.vdocipher.com/api/videos", null, {
      params: {
        title: req.body.fileName,
        folderId: "3a62c56b6bae4b36bb18de1415bb59f0"
      },
      headers: {
        Authorization:
          "Apisecret h0bfXiUNkDFWvOSKoLhjpctcsbCVUFFc4iziwdYSlwNAlwHM3zJd2gvpjNZ4BgFj",
      },

    });
    res.send(data.data);
    // console.log(data.data)
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
});

app.post("/getVideoOTP", async (req, res) => {
  try {
    const data = await axios.post("https://dev.vdocipher.com/api/videos/" + req.body.videoId + "/otp", { ttl: 300 }, {
      headers: {
        Authorization:
          "Apisecret h0bfXiUNkDFWvOSKoLhjpctcsbCVUFFc4iziwdYSlwNAlwHM3zJd2gvpjNZ4BgFj",
      },

    });
    res.send(data.data);
    // console.log(data.data)
  } catch (error) {
    // console.log(error);
    res.send(error);
  }
});

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
