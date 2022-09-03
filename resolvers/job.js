const { client, job, jobApplication, company } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolver = {
  Query: {
    jobs: async () => {
      try {
        const data = await job.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    job: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await job.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addJob: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await job.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const companyId = new mongoDB.ObjectId(args.input.CompanyId)
          console.log(companyId.toString());
          const company1 = await company.updateOne({_id: companyId},
            { $push: { job: result.insertedId.toString()} }
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
    updateJob: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await job.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "job updated",
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

    deleteJob: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await job.deleteOne({ _id: id });

          return {
            msg: "job deleted",
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

  JobUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Job";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolver;
