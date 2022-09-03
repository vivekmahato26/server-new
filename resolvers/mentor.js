const { client, mentor, tickets, course, batch, chatLogs } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    mentors: async () => {
      try {
        const data = await mentor.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    mentor: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await mentor.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addMentor: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await mentor.insertOne({
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
    updateMentor: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await mentor.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "mentor updated",
          };
        } catch (e) {
          console.log(e);
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
    deleteMentor: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await mentor.deleteOne({ _id: id });

          return {
            msg: "mentor deleted",
          };
        } catch (e) {
          console.log(e);
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
  },
  MentorUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Mentor";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  Mentor: {
    //array TODO
    tickets: async (parent) => {
      const ids = parent.tickets;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await tickets.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },

    course: async (parent) => {
      const ids = parent.course;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await course.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
    batch: async (parent) => {
      const ids = parent.batch;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await batch.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
    chats: async (parent) => {
      const ids = parent.chats;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await chatLogs.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
  },
};

module.exports = resolvers;
