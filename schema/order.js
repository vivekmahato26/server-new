module.exports = {
  root: ` 
        type Order {
            _id: String
            courseId: String
            couponId: String
            totalAmount:String
            discount: String
            orderDate: String
            status: String
            billingAddress: String
            batchId: String
            invoice : Invoice
            payment:[Payment]
            student : [Student]
            createdAt : String
            updatedAt : String
        }
        
        input OrderInput {
            _id: String
            courseId: String
            couponId: String
            totalAmount:String
            discount: String
            orderDate: String
            status: String
            billingAddress: String
            batchId: String
            payment:[String]
            invoice : String
            student: [String]
        }

        input OrderUpdate {
            _id: String
            courseId: String
            couponId: String
            totalAmount:String
            discount: String
            orderDate: String
            status: String
            billingAddress: String
            batchId: String
            payment:[String]
            invoice : String
            student: [String]
        }
        union OrderUnion = Order | err
    `,
  query: `
            type Query {
                orders: [Order]
                order(_id:String,createdAt:String): OrderUnion

            
        }`,
  mutation: `
            type Mutation {
                addOrder(input:OrderInput): GraphqlUnion
                updateOrder(updateID:String,update:OrderUpdate): GraphqlUnion
                deleteOrder(updateID: String!):GraphqlUnion
                
        }`,
};
