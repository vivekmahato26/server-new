const { client, project, modules } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    projects: async () => {
      try {
        const data = await project.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    project: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await project.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addProject: async (_, args, { req }) => {
      if (req.isAuth) {
        const moduleId = args.input.moduleID
        try {
          const result = await project.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const id = new mongoDB.ObjectId(moduleId);
          const res = await modules.updateOne({_id:id},{$push: {Project: result.insertedId.toString()}})
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

    updateProject: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await project.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "project updated",
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
    deleteProject: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await project.deleteOne({ _id: id });

          return {
            msg: "project deleted",
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

  ProjectUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Project";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
