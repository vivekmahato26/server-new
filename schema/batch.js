module.exports = {
  root: ` 
          type Batch {
              _id: String
              name:String
              start: String
              end: String
              price: String
              offerId:String
              discount:String
              currentStatus:String
              course : Course
              student : [Student]
              createdAt : String
              updatedAt : String
  
          }
          
          input BatchInput {
              name:String
              start: String
              end: String
              price: String
              offerId:String
              discount:String
              currentStatus:String
              course: String
              student: [String]
          }
  
          input BatchUpdate {
              name:String
              start: String
              end: String
              price: String
              offerId:String
              discount:String
              currentStatus:String
              course: String
              student: [String]
          }
          union BatchUnion = Batch | err
  
      `,
  query: `
          type Query {
              batchs: [Batch]
              batch(_id:String): BatchUnion
              
          }`,
  mutation: `
          type Mutation {
              registerStudent: GraphqlUnion
              addBatch(input:BatchInput): GraphqlUnion
              updateBatch(updateID:String,update:BatchUpdate): GraphqlUnion
              deleteBatch(batchID:String): GraphqlUnion
          }`,
};
