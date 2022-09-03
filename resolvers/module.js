const { client, modules, section, challenge, project, sectionTitle, course} = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    modules: async () => {
      try {
        const data = await modules.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    module: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await modules.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addModules: async (_, args, { req }) => {
      if (req.isAuth) {
        const courseId = args.input.courseID
        // console.log(args);
        try {
          const result = await modules.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const id = new mongoDB.ObjectId(courseId);
          console.log(id);
          const res = await course.updateOne({_id:id},{$push: {modules: result.insertedId.toString()}})
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
    updateModules: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await modules.updateOne(
            { _id: id },
            { $set: { ...args.update } }
          );

          return {
            msg: "modules updated",
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
   
    deleteModules: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await modules.deleteOne({ _id: id });

          return {
            msg: "modules deleted",
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



    addModulesSection: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.moduleId);
          const data = await modules.updateOne(
            { _id: id },
            { $push: { ...args.update } }
          );

          return {
            msg: "modules section updated",
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
    deleteModulesSection: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await section.deleteOne({ _id: id });

          return {
            msg: "section deleted",
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
  ModuleUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Modules";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Modules: {

    
    
    SectionTitle: async (parent) => {
      let ids = parent.SectionTitle;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await sectionTitle.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },

    Challenge: async (parent) => {
      let ids = parent.Challenge;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await challenge.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },

    Project: async (parent) => {
      let ids = parent.Project;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await project.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },


    // Section: async (parent) => {
    //   let ids = parent.Section;
    //   let res = [];
    //   if (ids) {
    //     for (const c of ids) {
    //       try {
    //         const id = new mongoDB.ObjectId(c);
    //         const data = await section.findOne({ _id: id });
    //         res.push(data);
    //       } catch (error) {
    //         console.log({ err: JSON.stringify(error) });
    //       }
    //     }
    //   }
    //   return res;
    // },


  },
};

module.exports = resolvers;
