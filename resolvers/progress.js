const { client, progress, batch, modules } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolver = {
  Query: {
    progress: async () => {
      try {
        const data = await progress.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    progresses: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await progress.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addProgress: async (_, args, { req }) => {
      if (req.isAuth) {
        const moduleId = args.input.moduleID
        try {
          const result = await progress.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const id = new mongoDB.ObjectId(moduleId);
          const res = await modules.updateOne({_id:id},{$push: {Challenge: result.insertedId.toString()}})
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
    updateProgress: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateId);
          const data = await progress.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "progress updated",
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
  ProgressUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Progress";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  Progress: {
    batchId: async (parent) => {
      const ids = parent.batchId;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await batch.findOne({ _id: id });
          res = data;
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
      }
      return res;
    },
  },
};

module.exports = resolver;
