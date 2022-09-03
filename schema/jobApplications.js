const typeDefs = {
  root: `
        type JobApp {
            studentId : String
            jobs : [Job]
            resumeId : String
            createdAt : String
            status : String
            updatedAt : String

        }
        input JobAppInput {
            studentId : String
            resumeId : String
            status : String
            jobs : [String]
        }
        input JobAppUpdate{
            studentId : String
            resumeId : String
            status : String
            jobs : [String]
        }
        union JobAppUnion = JobApp | err
    `,
  query: `
        type Query {
            jobapps :[JobApp]
            jobapp (_id : String,createdAt:String): JobAppUnion
        }
    `,
  mutation: `
        type Mutation {
            addJobApps(input : JobAppInput):GraphqlUnion
            updateJobApps (updateId : String! , update : JobAppUpdate) : GraphqlUnion
            deleteJobApps(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
