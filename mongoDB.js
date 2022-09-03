const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
// const uri = "mongodb://localhost:27017";
const uri ="mongodb://0.0.0.0:27017"

const client = new MongoClient(
  uri,
  { useUnifiedTopology: true },
  { useNewUrlParser: true },
  { connectTimeoutMS: 30000 },
  { keepAlive: 1 }
);

const database = client.db("insertDB");

const address = database.collection("address");
const users = database.collection("users");
const batch = database.collection("batch");
const challenge = database.collection("challange");
const chatLogs = database.collection("chatLogs");
const company = database.collection("company");
const coupon = database.collection("coupon");
const job = database.collection("job");
const jobApplication = database.collection("jobApplication");
const mentor = database.collection("mentor");
const messages = database.collection("messages");
const modules = database.collection("modules");
const course = database.collection("course");
const order = database.collection("order");
const payment = database.collection("payment");
const progress = database.collection("progress");
const resume = database.collection("resume");
const section = database.collection("section");
const sectionTitle = database.collection("sectionTitle");
const student = database.collection("student");
const tickets = database.collection("tickets");
const subscription = database.collection("subscription");
const project = database.collection("project");

exports.client = client;
exports.address = address;
exports.database = database;
exports.users = users;
exports.batch = batch;
exports.challenge = challenge;
exports.chatLogs = chatLogs;
exports.company = company;
exports.coupon = coupon;
exports.job = job;
exports.jobApplication = jobApplication;
exports.mentor = mentor;
exports.modules = modules;
exports.course = course;
exports.order = order;
exports.progress = progress;
exports.resume = resume;
exports.section = section;
exports.sectionTitle = sectionTitle;
exports.student = student;
exports.tickets = tickets;
exports.subscription = subscription;
exports.messages = messages;
exports.payment = payment;
exports.project = project;
