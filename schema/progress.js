const typeDefs = {
  root: `
        type Completed {
            _id : String
            code : String
            submission : String
            createdAt : String
            updatedAt : String
        }
        type ProgressData{
            score : Int
            assignmentsCompleted : [Completed]
            projectsCompleted : [Completed]
            challengesCompleted : [Completed]
            completed : Boolean
            percentage : Int
            currentState : String
            currentModule : String
            Section : [SectionData]
            lastPlayed : SectionData
        }
        type SectionData {
            sectionId : String
            videoProgress: String
        }
        type Progress{
            batchId  : String
            progressData : ProgressData
            createdAt : String
            updatedAt : String
            mileStones : String
        }

        input CompletedInput {
            code : String
            submission : String
        }
        input ProgressDataInput{
            score : Int
            assignmentsCompleted : [CompletedInput]
            projectsCompleted : [CompletedInput]
            challengesCompleted : [CompletedInput]
            completed : Boolean
            percentage : Int
            currentState : String
            currentModule : String
            Section : [SectionDataInput]
            lastPlayed : SectionDataInput
        }
        input ProgressDataUpdate{
            score : Int
            assignmentsCompleted : [CompletedInput]
            projectsCompleted : [CompletedInput]
            challengesCompleted : [CompletedInput]
            completed : Boolean
            percentage : Int
            currentState : String
            currentModule : String
            Section : [SectionDataUpdate]
            lastPlayed : SectionDataUpdate
        }
        input SectionDataInput {
            sectionId : String
            videoProgress: String
        }
        input SectionDataUpdate {
            sectionId : String
            videoProgress: String
        }
        input ProgressInput{
            progressData : ProgressDataInput
        }
        input ProgressUpdate{
            progressData : ProgressDataUpdate

        }
        union ProgressUnion = Progress | err
    `,

  query: `
        type Query {
            progress : [Progress]
            progresses (_id:String,createdAt:String):ProgressUnion
        }
    `,

  mutation: `
        type Mutation {
            addProgress(input : ProgressInput) : GraphqlUnion
            updateProgress(updateId : String! , update : ProgressUpdate) : GraphqlUnion
            deleteProgress(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
