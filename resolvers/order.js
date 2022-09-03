const { client, order, student, payment, invoice } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    orders: async () => {
      try {
        const data = await order.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    order: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await order.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addOrder: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await order.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const studentId = new mongoDB.ObjectId(args.input.student);
          const studentData = await student.updateOne(
            { _id: studentId },
            { $push: { order: result.insertedId.toString() } }
          );
          const invoiceId = new mongoDB.ObjectId(args.input.invoice);
          const invoiceData = await invoice.updateOne(
            { _id: invoiceId },
            { $push: { order: result.insertedId.toString() } }
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

    updateOrder: async (_, args, context, info) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await order.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "order updated",
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
    deleteOrder: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.id);
          const data = await order.deleteOne({ _id: id });

          return {
            msg: "Orders deleted",
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
  OrderUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Order";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Order: {
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
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },

    payment: async (parent) => {
      const courseIds = parent.payment;

      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await payment.findOne({ _id: id });
            res.push(data);
          } catch (error) {
            console.log({ err: JSON.stringify(error) });
          }
        }
      }
      return res;
    },
    invoice: async (parent) => {
      const ids = parent.invoice;

      let res = [];
      if (ids) {
        for (const c of ids) {
          try {
            const id = new mongoDB.ObjectId(c);
            const data = await invoice.findOne({ _id: id });
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
