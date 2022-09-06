const { client, chatLogs, messages, tickets } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    chatlogs: async () => {
      try {
        const data = await chatLogs.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error.message) };
      }
    },
    chatlog: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await chatLogs.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error.message) };
      }
    },
  },
  Mutation: {
    addChatLogs: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await chatLogs.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          return {
            msg: "data Added",
          };
        } catch (e) {
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "Please Login!!!",
        };
      }
    },
  },
  ChatLogsUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "ChatLogs";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  ChatLogs: {
    messages: async (parent) => {
      let ids = parent.Messages;
      let res = [];

      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await messages.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            return { err: JSON.stringify(error.message) };
          }
        }
      }
      return res;
    },
    ticket: async (parent) => {
      let ids = parent.ticket;
      let res = [];

      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await tickets.findOne({ _id: id });
          res.push(data);
        } catch (error) {
          return { err: JSON.stringify(error.message) };
        }
      }
      return res;
    },
  },

};

module.exports = resolvers;
