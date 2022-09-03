module.exports = {
    root: ` 
        type Project {
          _id: String
          projectSerialNo: String
          tasks: [String]
          title: String
          description: String
          createdAt : String
          updatedAt : String
        }
        
        input ProjectInput {
          _id: String
          projectSerialNo: String
          tasks: [String]
          title: String
          moduleID: String
          description: String
        }

        input ProjectUpdate {
          _id: String
          projectSerialNo: String
          tasks: [String]
          title: String
          moduleID: String
          description: String
        }
        union ProjectUnion = Project | err
      `,
    query: `
        type Query {
            projects: [Project]
            project(_id:String,createdAt:String): ProjectUnion          
        }`,
    mutation: `
        type Mutation {
            addProject(input:ProjectInput): GraphqlUnion
            updateProject(updateID:String,update:ProjectUpdate): GraphqlUnion
            deleteProject(updateID: String!):GraphqlUnion
        }`,
  };
 