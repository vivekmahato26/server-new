const typeDefs = {
  root: `
        type GeneralDetails{
            firstName: String
            userName : String
            lastName: String
            phone: String
            gender : String
            address: Address
            dob: String
            createdAt : String
            updatedAt : String
            Qualification : String
            Experience : String
            CourseAllocated : String
        }
    
        type Mentor {
            _id :String
            name:String
            tickets : [Tickets]
            email: String!
            password: String
            chats : [ChatLogs]
            course : Course
            batch : Batch
            MentorDetails : GeneralDetails
            createdAt : String
            updatedAt : String          
        }

        input GeneralDetailsInput{
            firstName: String
            userName : String
            lastName: String
            phone: String
            gender : String
            dob: String
            createdAt : String
            updatedAt : String
            Qualification : String
            Experience : String
            CourseAllocated : String
            address : String
        }

        input MentorInput {
            name:String
            tickets : String
            chats : String
            email: String!
            password: String
            course : String
            batch : String
            MentorDetails : GeneralDetailsInput
        }
        input MentorUpdate{
            tickets : String
            email: String!
            password: String
            chats : String
            course : String
            batch : String
            MentorDetails : GeneralDetailsInput           
        }
        union MentorUnion = Mentor | err

    `,
  query: `
        type Query {
            mentors:[Mentor]
            mentor(_id:String,createdAt:String):MentorUnion
        }
    `,
  mutation: `
        type Mutation {
            addMentor (input : MentorInput):GraphqlUnion
            updateMentor(updateID :String,update : MentorUpdate) : GraphqlUnion
            deleteMentor(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
