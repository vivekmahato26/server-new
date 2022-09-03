const { gql } = require("apollo-server-express");

const student = require("./student");
const mentor = require("./mentor");
const course = require("./course");
const subscription = require("./subscription");
const payment = require("./payment");
const order = require("./order");
const section = require("./section");
const sectionTitle = require("./sectionTitle");
const batch = require("./batch");
const challenge = require("./challange");
const coupon = require("./coupon");
const messages = require("./messages");
const addressSchema = require("./address");
const ticketSchema = require("./tickets");
const chatLogsResolver = require("./chatLogs");
const JobSchema = require("./jobApplications");
const companySchema = require("./company");
const jobSchema = require("./job");
const userSchema = require("./userSchema");
const resumeSchema = require("./resume");
const progressSchema = require("./progress");
const moduleSchema = require("./modules")
const projectSchema = require("./project")
const invoice = require("./invoice");
const registerStudentSchema = require("./registerStudent");


module.exports = gql`
  ${student.root}
  ${course.root}
  ${subscription.root}
  ${payment.root}
  ${order.root}
  ${section.root}
  ${sectionTitle.root}
  ${batch.root}
  ${challenge.root}
  ${coupon.root}
  ${addressSchema.root}
  ${ticketSchema.root}
  ${chatLogsResolver.root}
  ${JobSchema.root}
  ${companySchema.root}
  ${jobSchema.root}
  ${userSchema.root}
  ${resumeSchema.root}
  ${progressSchema.root}
  ${messages.root}
  ${projectSchema.root}
  ${moduleSchema.root}
  ${mentor.root}
  ${invoice.root}
  ${registerStudentSchema.root}




  ${student.query}
  ${messages.query}
  ${course.query}
  ${subscription.query}
  ${payment.query}
  ${order.query}
  ${section.query}
  ${sectionTitle.query}
  ${batch.query}
  ${challenge.query}
  ${coupon.query}
  ${addressSchema.query}
  ${ticketSchema.query}
  ${chatLogsResolver.query}
  ${JobSchema.query}
  ${companySchema.query}
  ${jobSchema.query}
  ${userSchema.query}
  ${resumeSchema.query}
  ${progressSchema.query}
  ${projectSchema.query}
  ${moduleSchema.query}
  ${mentor.query}
  ${invoice.query}
  ${registerStudentSchema.query}





  ${student.mutation}
  ${messages.mutation}
  ${course.mutation}
  ${subscription.mutation}
  ${payment.mutation}
  ${order.mutation}
  ${section.mutation}
  ${sectionTitle.mutation}
  ${batch.mutation}
  ${challenge.mutation}
  ${coupon.mutation}
  ${addressSchema.mutation}
  ${ticketSchema.mutation}
  ${chatLogsResolver.mutation}
  ${JobSchema.mutation}
  ${companySchema.mutation}
  ${jobSchema.mutation}
  ${userSchema.mutation}
  ${resumeSchema.mutation}
  ${progressSchema.mutation}
  ${projectSchema.mutation}
  ${moduleSchema.mutation}
  ${mentor.mutation}
  ${invoice.mutation}
  ${registerStudentSchema.mutation}





  union GraphqlUnion = res | err

  type err {
      err : String
  }
  type res {
      msg: String
  }
`;
