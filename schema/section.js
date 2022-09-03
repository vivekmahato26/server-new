module.exports = {
  root: ` 
        type Section {
            _id: String
            video: String
            sourceCode: SourceCode
            image: String
            title: String
            about: About
            resources: [Resource]
            videoId: String
            createdAt: String
            updatedAt: String
        }

        type SourceCode {
            type: String
            code: String
        }
        type About {
            title: String
            description: String
            subDesc : [String]

        }
        type Resource {
            type: String
            url: String
        }
        
        input SectionInput {
            _id: String
            video: String
            videoId: String
            sourceCode: String
            image: String
            title: String
            about: String
            resources: [String]
            createdAt: String
            updatedAt: String
            sectionTitleID: String

        }

        input SourceCodeInput {
            type: String
            code: String
        }
        input AboutInput {
            title: String
            description: String
            subDesc : [String]

        }
        input ResourceInput {
            type: String
            url: String
        }


        input SectionUpdate {
            _id: String
            video: String
            videoId: String
            sourceCode: String
            image: String
            title: String
            about: String
            resources: [String]
            createdAt: String
            updatedAt: String
            sectionTitleID : String
        }
        union SectionUnion = Section | err

        `,
  query: `
            type Query {
                sections: [Section]
                section(_id:String,createdAt:String): SectionUnion

            
        }`,
  mutation: `
            type Mutation {
                addSection(input:SectionInput): GraphqlUnion
                updateSection(updateID:String,update:SectionUpdate): GraphqlUnion
                deleteSection(updateID: String!):GraphqlUnion

        }`,
};
