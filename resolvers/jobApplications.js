const { client, jobApplication, job } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolver = {
  Query: {
    jobapps: async () => {
      try {
        const data = await jobApplication.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    jobapp: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await jobApplication.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await jobApplication.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const jobId = new mongoDB.ObjectId(args.input.jobs)
          console.log(args);
          const job1 = await job.updateOne({_id: jobId},
            { $push: { jobApplication: result.insertedId.toString()} }
            );
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
    updateJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await jobApplication.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "jobApplications updated",
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
    deleteJobApps: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await jobApplication.deleteOne({ _id: id });

          return {
            msg: "jobApplication deleted",
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

  JobAppUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "JobApp";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  JobApp: {
    jobs: async (parent) => {
      const ids = parent.jobId;
      let res = [];

      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await job.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
    },
  },
};

module.exports = resolver;
