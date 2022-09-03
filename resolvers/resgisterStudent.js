const { client, registerStudent, student } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Mutation: {
    register: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await registerStudent.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          return {
            msg: "data Added",
          };
        } catch (error) {
          return {
            err: JSON.stringify(error),
          };
        }
      } else {
        return {
          msg: "please login !!!",
        };
      }
    },
  },
};

module.exports = resolvers;
