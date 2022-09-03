const { client, batch, course, student } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    batchs: async () => {
      try {
        const data = await batch.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    batch: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await batch.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addBatch: async (_, args, { req }) => {
      if (req.isAuth) {
        console.log(args);
        if (req.userType == "admin" || !"employee" || !"student") {
          try {
            const result = await batch.insertOne({
              ...args.input,
              createdAt: date.toISOString(),
            });
            
            const courseId = new mongoDB.ObjectId(args.input.course)
            const course1 = await course.updateOne({_id: courseId},
              { $push: { batch: result.insertedId.toString()} }
              );
            return {
              msg: "data Added",
            };
          } catch (err) {
            console.log(err);
            return {
              err: JSON.stringify(err),
            };
          }
        } else {
          return {
            msg: "Unauthorized",
          };
        }
      }
      return {
        msg: "Please Login!!!",
      };
    },
    updateBatch: async (_, args, { req }, info) => {
      if (req.isAuth) {
        if (req.userType == "admin" || !"student") {
          try {
            const id = new mongoDB.ObjectId(args.updateID);
            const data = await batch.updateOne(
              { _id: id },
              { $set: { ...args.update, updatedAt: date.toISOString() } }
            );

            return {
              msg: "batch updated",
            };
          } catch (e) {
            console.log(e);
            return { err: JSON.stringify(e) };
          }
        } else {
          return {
            msg: "Unauthorized",
          };
        }
      }
      return {
        msg: "Please Login!!!",
      };
    },

    deleteBatch: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.batchID);
          const data = await batch.deleteOne({ _id: id });

          return {
            msg: "batch deleted",
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

  Batch: {
    student: async (parent) => {
      const ids = parent.student;
      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await student.findOne({ _id: id });

            res.push(data);
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        }
      }
      return res;
    },

    course: async (parent) => {
      const ids = parent.course;
      let res = [];
      if (ids) {
        // for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(ids);
            const data = await course.findOne({ _id: id });

            res = data;
          } catch (error) {
            return { err: JSON.stringify(error) };
          }
        // }
      }
      return res;
    },
  },

  BatchUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Batch";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
