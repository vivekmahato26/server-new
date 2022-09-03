module.exports = {
  root: `
        type RegisterStudent {
            _id :String
            student : Student
            createdAt : String
            updatedAt : String
        }
        input RegisterInput {
            student : String
            createdAt : String
            updatedAt : String
        }
         union RegisterUnion = RegisterStudent | err
    `,
  query: `
    type Query {
       registerStudent : [RegisterStudent]

    }
    `,
  mutation: `
        type Mutation {

            register (input:RegisterInput) : GraphqlUnion
        }
    `,
};
