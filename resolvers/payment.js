const { client, student, payment, invoice } = require("../mongoDB");

const mongoDB = require("mongodb");

const date = new Date();

const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");

var rzp = new Razorpay({
  // key_id: "rzp_test_eph10R9XDU9rY0",
  key_id: "rzp_test_rn44sWeBIN50Sk",
  // key_secret: "ogJPCvrc8PFLkK8CqNv8EAzV",
  key_secret: "20fUf7LT8Hi1F5qq5gsqMer5",
});

const resolvers = {
  Query: {
    payments: async () => {
      try {
        const data = await payment.find({}).toArray();
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
    payment: async (_, args) => {
      try {
        const id = new mongoDB.ObjectId(args._id);
        const data = await payment.findOne({ _id: id });
        return data;
      } catch (error) {
        return { err: JSON.stringify(error) };
      }
    },
  },

  Mutation: {
    addPayment: async (_, args, { req }) => {
      if (req.isAuth) {
        // if (req.userType == "student" || !"admin" || !"employee") {
        try {
          const result = await payment.insertOne({
            ...args.input,
            createdAt: date.toISOString(),
          });
          const studentId = new mongoDB.ObjectId(args.input.student);
          const studentData = await student.updateOne(
            { _id: studentId },
            { $push: { payment: result.insertedId.toString() } }
          );
          const invoiceId = new mongoDB.ObjectId(args.input.invoice);
          const invoiceData = await invoice.updateOne(
            { _id: invoiceId },
            { $push: { payment: result.insertedId.toString() } }
          );
          if (!args.input.custId) {
            const razor = await rzp.customers.create({
              name: args.input.name,
              email: req.email,
              contact: args.input.contact,
            });
          } else {
            return new Error("user already paid");
          }
          return {
            msg: "payment added",
          };
        } catch (err) {
          return {
            err: JSON.stringify(err),
          };
        }
        // } else {
        //   return new Error("user not a student");
        // }
      } else {
        return new Error("user not authorised");
      }
    },

    updatePayment: async (_, args, context, info) => {
      try {
        const id = new mongoDB.ObjectId(args.updateID);
        const data = await payment.updateOne(
          { _id: id },
          { $set: { ...args.update, updatedAt: date.toISOString() } }
        );

        rzp.customers
          .edit(args.input.custId, {
            name: args.input.name,
            email: args.email,
            contact: args.input.contact,
          })
          .then((data) => {})
          .catch((error) => {});

        return {
          msg: "payment updated",
        };
      } catch (err) {
        return {
          err: JSON.stringify(err),
        };
      }
    },
  },

  Payment: {
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

  PaymentUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Payment";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
};

module.exports = resolvers;
