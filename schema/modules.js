const typeDefs = {
  root: `
          type Modules {
            _id: String
            title:String
            SectionTitle: [SectionTitle]
            Challenge: [Challenge]
            Project: [Project]
            createdAt : String
            updatedAt : String
  
          }
          input ModulesInput{
            title:String
            SectionTitle: [String]
            Challenge: [String]
            Project: [String]
            courseID: String

          }
          input ModulesUpdate{
            title:String
            Challenge: [String]
            SectionTitle: [String]
            courseID: String
            Project: [String]
          }
          input addModulesSection{
            Section: String
          }
          union ModuleUnion  = Modules | err
      `,

  query: `
        type Query {
            modules : [Modules]
            module(_id :String):ModuleUnion
        }
      `,
  mutation: `
          type Mutation {
            addModules (input : ModulesInput):GraphqlUnion
            updateModules(updateID:String!,update:ModulesUpdate):GraphqlUnion
            deleteModules(updateID: String!):GraphqlUnion
            
            addModulesSection(moduleId: String, sectionId:String, ,update:addModulesSection): GraphqlUnion
            deleteModulesSection(moduleId: String, sectionId:String): GraphqlUnion

          }
      `,
};

module.exports = typeDefs;
