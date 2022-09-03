const { client, section, sectionTitle } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    sections: async () => {
      try {
        const data = await section.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    section: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await section.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addSection: async (_, args, { req }) => {
      if (req.isAuth) {
        const sectionTitleId = args.input.sectionTitleID;
        try {
          const result = await section.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const id = new mongoDB.ObjectId(sectionTitleId);
          const res = await sectionTitle.updateOne({_id:id},{$push: {Section: result.insertedId.toString()}})
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

    updateSection: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await section.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "section updated",
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
    deleteSection: async (_, args, { req }) => {
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
  SectionUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Section";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
