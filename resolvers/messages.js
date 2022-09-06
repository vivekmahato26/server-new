const { client, messages, chatLogs } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    messages: async () => {
      try {
        const data = await messages.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error.message) };
      }
    },
    message: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await messages.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error.message) };
      }
    },
  },

  Mutation: {
    addMessage: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await messages.insertOne({
            ...args.input,
            senderId: req.userId,
            receiverId: args.input.receiverId,
            createdAt: date.toISOString(),
          });
          return {
            msg: "data added",
          };
        } catch (error) {
          return {
            err: JSON.stringify(error.message),
          };
        }
      } else {
        return new Error("please login");
      }
    },
    updateMessage: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await messages.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "messages updated",
          };
        } catch (err) {
          return { err: JSON.stringify(err) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
    deleteMessage: async (_, args, { req }) => {
      console.log(args);
      if (req.isAuth) {
        if (req.userType == "admin") {
          try {
            const id = new mongoDB.ObjectId(args.id);
            const data = await messages.deleteOne({ _id: id });

            return {
              msg: "messages deleted",
            };
          } catch (err) {
            return { err: JSON.stringify(err) };
          }
        } else {
          return new Error("User not Authorised to delete this message");
        }
      } else {
        return new Error("user not logged in please login");
      }
    },
  },
  MessageUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Messages";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  Messages: {
    chatLogs: async (parent) => {
      let ids = parent.chatLogs;
      let res;

      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await chatLogs.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error.message) };
        }
      }
      return res;
    },
  },
};

module.exports = resolvers;
