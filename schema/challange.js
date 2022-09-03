module.exports = {
  root: ` 
        type Challenge {
            _id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            createdAt : String
            updatedAt : String
        }
        
        input ChallengeInput {
            _id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            student: [String]
            moduleID: String
        }

        input ChallengeUpdate {
            _id: String
            project: Boolean
            tasks: [String]
            objective:String
            title: String
            description: String
            images:String
            solution:String
            hints:[String]
            test_cases: [String]
            student: [String]
            moduleID: String
        }
        union ChallengeUnion = Challenge | err
    `,
  query: `
            type Query {
                challenges: [Challenge]
                challenge(_id:String,createdAt:String): ChallengeUnion          
        }`,
  mutation: `
            type Mutation {
                addChallenge(input:ChallengeInput): GraphqlUnion
                updateChallenge(updateID:String,update:ChallengeUpdate): GraphqlUnion
                deleteChallenge(updateID: String!):GraphqlUnion

            }`,
};
