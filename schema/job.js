const typeDefs = {
  root: `
        type Job {
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
            createdAt : String
            updatedAt : String

        }
        input JobInput {
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
        }
        input JobUpdate {
            title : String
            Description : String
            Skills : String
            Payscale : String
            CompanyId : String
            Roles : String
            Location : String
        }
        union JobUnion = Job | err
    `,
  query: `
        type Query {
            jobs  : [Job]
            job(_id :String) : JobUnion
        }
    `,
  mutation: `
        type Mutation{
            addJob (input : JobInput):GraphqlUnion
            updateJob (updateId:String!,update:JobUpdate):GraphqlUnion
            deleteJob(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
