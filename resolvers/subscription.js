const { client, subscription, batch, student, order, course, payment } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const resolvers = {
  Query: {
    subscriptions: async () => {
      try {
        const data = await subscription.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    subscription: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await subscription.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addSubscription: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await subscription.insertOne({
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

    updateSubscription: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await subscription.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "subscription updated",
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
    deleteSubscription: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await subscription.deleteOne({ _id: id });

          return {
            msg: "subscription deleted",
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
  SubscriptionUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Subscription";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Subscription: {
    student: async (parent) => {
      const ids = parent.student;

      let res = [];
      if (ids) {
        // for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(ids);
            const data = await student.findOne({ _id: id });
            res = data;
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        // }
      }
      return res;
    },
    course: async (parent) => {
      const ids = parent.course;

      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await course.findOne({ _id: id });
          res = data;
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
      }
      return res;
    },
    payment: async (parent) => {
      const ids = parent.payment;

      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await payment.findOne({ _id: id });
          res = data;
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
      }
      return res;
    },
    order: async (parent) => {
      const ids = parent.order;

      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await order.findOne({ _id: id });
          res = data;
        } catch (error) {
          console.log({ err: JSON.stringify(error) });
        }
      }
      return res;
    },
    batch: async (parent) => {
      const ids = parent.batch;

      let res = [];
      if (ids) {
        // for (const c of batchIds) {
          try {
            const id = new mongoDB.ObjectId(ids);
            const data = await batch.findOne({ _id: id });
            res= data;
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        // }
      }
      return res;
    },
  },
};

module.exports = resolvers;
