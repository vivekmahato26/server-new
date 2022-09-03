const { client, address, users } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    addresses: async () => {
      try {
        const data = await address.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    address: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await address.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },
  Mutation: {
    addAddress: async (_, args, { req }) => {
      // console.log(req);
      if (req.isAuth) {
        try {
          const result = await address.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const userId = new mongoDB.ObjectId(req.userId)
          const data = await users.updateOne({_id: userId},
            { $push: { address: result.insertedId.toString()} }
            );
          return {
            msg: "data Added",
          };
        } catch (e) {
          return { err: JSON.stringify(e) };
        }
      } else {
        return {
          msg: "user nort logged !!",
        };
      }
    },
    updateAddress: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await address.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "address updated",
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
    deleteAddress: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await address.deleteOne({ _id: id });

          return {
            msg: "address deleted",
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
  AddressUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Address";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
