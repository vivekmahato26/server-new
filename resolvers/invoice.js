const {
  client,
  invoice,
  student,
  subscription,
  order,
  payment,
} = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();
const resolvers = {
  Query: {
    invoices: async () => {
      try {
        const data = await invoice.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    invoice: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await invoice.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addInvoice: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const result = await invoice.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const studentId = new mongoDB.ObjectId(args.input.student);
          const studentData = await student.updateOne(
            { _id: studentId },
            { $push: { invoice: result.insertedId.toString() } }
          );
          const subsId = new mongoDB.ObjectId(args.input.subscription);
          const subsData = await subscription.updateOne(
            { _id: subsId },
            { $push: { invoice: result.insertedId.toString() } }
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

    updateInvoice: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.updateID);
          const data = await invoice.updateOne(
            { _id: id },
            { $set: { ...args.update, updatedAt: date.toISOString() } }
          );

          return {
            msg: "invoice updated",
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
    deleteInvoice: async (_, args, { req }) => {
      if (req.isAuth) {
        try {
          const id = new mongoDB.ObjectId(args.invoiceID);
          const data = await invoice.deleteOne({ _id: id });

          return {
            msg: "invoice deleted",
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
  InvoiceUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Invoice";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  Invoice: {
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
    student: async (parent) => {
      const ids = parent.student;

      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await student.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
    subscriptions: async (parent) => {
      const ids = parent.subscriptions;
      let res = [];
      if (ids) {
        try {
          const id = new mongoDB.ObjectId(ids);

          const data = await subscription.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      }
      return res;
    },
  },
};
module.exports = resolvers;
