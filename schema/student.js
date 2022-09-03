module.exports = {
  root: ` 
        type Student {
            _id: String
            firstName:String
            lastName:String
            userName: String
            phone: Int
            image : String
            email: String
            password: String
            gender : String
            dob: String
            course: [Course]
            address: Address
            batch : [Batch]
            invoice : Invoice
            subscription: Subscription
            tickets: [Tickets]
            payments: Payment
            orders: [Order]
            jobApp: JobApp
            challanges: Challenge
            createdAt: String
            updatedAt: String
            progress: Progress
        }
        
        input StudentInput {
            firstName:String
            lastName:String
            image : String
            userName: String
            phone: Int
            email: String
            gender : String
            password: String
            dob: String
            address: String
            orders: [String]
            course:[String]
            tickets: [String]
            subscription: [String]
            progress: String
        }

        input StudentUpdate {
            firstName:String
            lastName:String
            image : String
            userName: String
            phone: Int
            email: String
            gender : String
            password: String
            dob: String
            address: String
            orders: [String]
            course:[String]
            tickets: [String]
            subscription: [String]
            progress: String
        }
        union StudentUnion = Student | err
        `,
  query: `
            type Query {
                students: [Student]
                student(_id:String):StudentUnion 
        }`,
  mutation: `
            type Mutation {
                addStudent(input:StudentInput): GraphqlUnion
                updateStudent(updateID:String,update:StudentUpdate): GraphqlUnion
                updateProfilePic(url:String,userType:String):GraphqlUnion
                deleteStudent(updateID: String!):GraphqlUnion
                
        }`,
};
