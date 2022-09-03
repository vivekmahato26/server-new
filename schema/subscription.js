module.exports = {
  root: ` 
        type Subscription {
            id: String
            startDate: String
            endDate: String
            invoiceId:String
            order: Order
            payment: Payment
            course: Course
            student : Student
            batch: Batch
            createdAt : String
            updatedAt : String
        }
        
        input SubscriptionInput {
            id: String
            startDate: String
            endDate: String
            invoiceId:String
            order: String
            payment: String
            course: String
            batch: String
            student: String
        }

        input SubscriptionUpdate {
            id: String
            startDate: String
            endDate: String
            invoiceId:String
            order: String
            payment: String
            course: String
            batch: String
            student: String
        }
        union SubscriptionUnion = Subscription | err

        `,
  query: `
            type Query {
                subscriptions: [Subscription]
                subscription(_id:String): SubscriptionUnion

            
        }`,
  mutation: `
            type Mutation {
                addSubscription(input:SubscriptionInput): GraphqlUnion
                updateSubscription(updateID:String,update:SubscriptionUpdate): GraphqlUnion
                deleteSubscription(updateID: String!):GraphqlUnion

        }`,
};
