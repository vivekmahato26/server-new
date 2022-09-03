const { client, course, batch, challenge, section, modules } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    courses: async () => {
      try {
        const data = await course.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    course: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await course.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addCourse: async (_, args, { req }) => {
      if (req.isAuth) {
        if ((req.userType = "admin")) {
          try {
            const result = await course.insertOne({
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
            msg: "user not authorised!!!",
          };
        }
      } else {
        return {
          msg: "Please Login!!!",
        };
      }
    },

    updateCourse: async (_, args, { req }) => {
      if (req.isAuth) {
        if ((req.userType = "admin")) {
          try {
            const id = new mongoDB.ObjectId(args.updateID);
            const data = await course.updateOne(
              { _id: id },
              { $set: { ...args.update, updatedAt: date.toISOString() } }
            );

            return {
              msg: "challange updated",
            };
          } catch (e) {
            console.log(e);
            return { err: JSON.stringify(e) };
          }
        } else {
          return {
            msg: "user not authorised!!",
          };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
    deleteCourse: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await course.deleteOne({ _id: id });

          return {
            msg: "course deleted",
          };
        } catch (e) {
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user not logged !!",
        };
      }
    },
  },
  CourseUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Course";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Course: {
    batch: async (parent) => {
      const batchIds = parent.batch;

      let res = [];
      if (batchIds) {
        for (const c of batchIds) {
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
    challenges: async (parent) => {
      const ids = parent.challenges;

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
    sections: async (parent) => {
      const ids = parent.sections;

      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await section.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
    modules: async (parent) => {
      const ids = parent.modules;

      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await modules.findOne({ _id: id });
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
