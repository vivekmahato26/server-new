const typeDefs = {
  root: `
          type SectionTitle {
            _id: String
            title:String
            createdAt: String
            sectionType:String
            updatedAt: String
            description: String
            data: [SectionData] ${ /* Store only section data ID */'' }
            Section: [Section]
          }
          input SectionTitleInput{
            title:String
            createdAt: String
            sectionType:String
            updatedAt: String
            description: String
            data: [String] ${ /* Store only section data ID */'' }
            Section: [String]
            moduleID: String
          }
          input SectionTitleUpdate{
            title:String
            createdAt: String
            sectionType:String
            updatedAt: String
            description: String
            data: [String] ${ /* Store only section data ID */'' }
            Section: [String]
          }
          union SectionTitleUnion = SectionTitle | err
      `,

  query: `
          type Query {
              sectionTitles : [SectionTitle]
              sectionTitle(_id :String):SectionTitleUnion
          }
      `,
  mutation: `
          type Mutation {
              addSectionTitle (input : SectionTitleInput):GraphqlUnion
              updateSectionTitle(updateID:String!,update:SectionTitleUpdate):GraphqlUnion
              deleteSectionTitle(updateID: String!):GraphqlUnion

          }
      `,
};

module.exports = typeDefs;
