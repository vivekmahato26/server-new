

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const { client, student, users, address, mentor } = require("../mongoDB");

const mongoDB = require("mongodb");
const date = new Date();

module.exports = {
  Query: {
    login: async (_, args) => {
      try {
        const { userType } = args;
        const { email } = args;
        let checkUser;
        checkUser = await users.findOne({ email });
        if (userType === "student") {
          checkUser = await student.findOne({ email });
        }
        if (userType === "mentor") {
          checkUser = await mentor.findOne({ email });
        }

        if (!checkUser) {
          return new Error("User not registered");
        } else {
          const exp = "50days";
          const storedPassword = checkUser.password;
          const { password } = args;

          const compare = await bcrypt.compare(password, storedPassword);

          if (!compare) {
            return new Error("wrong password");
          } else {
            // const studentId = await student.find({});
            // console.log(studentId._id);
            const token = jwt.sign(
              {
                id: checkUser._id,
                userID: checkUser.userID,
                email: checkUser.email,
                userType: checkUser.userType,
              },

              process.env.JWT_KEY,

              {
                expiresIn: exp,
              }
            );

            return {
              token,
              id: checkUser._id,
              userID: checkUser.userID,
              userType: checkUser.userType,
              email: checkUser.email,
              tokenExpiration: exp,
            };
          }
        }
      } catch (error) {
        return new Error(error);
      }
    },
    getUser: async (_, args, { req }, info) => {
      if (req.isAuth) {
        try {
          const _id = new mongoDB.ObjectId(req.userId);
          const data = await users.findOne({ _id: _id });
          return { ...data, userID: _id };
        } catch (error) {
          return { err: JSON.stringify(error) };
        }
      } else {
        return new Error("Please Login!!!");
      }
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      try {
        const { email } = args.input;
        const checkUser = await users.findOne({ email });

        if (checkUser) {
          return new Error("Email already registered");
        } else {
          const { password } = args.input;
          const salt = await bcrypt.genSalt();
          const hash = await bcrypt.hash(password, salt);
          const data = await users.insertOne({
            ...args.input,
            password: hash,
            createdAt: date.toISOString(),
          });
          return {
            msg: "data added",
          };
        }
      } catch (err) {
        return { err: JSON.stringify(err.message) };
      }
    },
  },
  UserUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "User";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },
  studentUnion: {
    __resolveType(obj, context, info) {
      if (obj._id) {
        return "Student";
      }
      if (obj.err) {
        return "err";
      }
      return null;
    },
  },

  User: {

    address: async (parent) => {
      const ids = parent.address;
      let res;
      if (ids) {
        // for (let c of ids) {
        try {
          const id = new mongoDB.ObjectId(ids);
          const data = await address.findOne({ _id: id });
          res = data;
        } catch (error) {
          return { err: JSON.stringify(error) };
          // }
        }
      }
      return res;
    },
    
  },
};
