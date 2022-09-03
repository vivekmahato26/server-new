const typeDefs = {
    root: `
          type Messages {
              _id : ID
              receiverId : String
              senderId : String
              emoji : String
              Message : [String]
              chatLogs : ChatLogs
              createdAt : String
              updatedAt : String
          }
          input MessageInput{
              emoji : String
              Message : [String]
              createdAt : String
              updatedAt : String
              receiverId: String
              chatLogs : String
          }
          input MessageUpdate {
              emoji : String
              Message : [String]
              createdAt : String
              updatedAt : String
              receiverId: String
              chatLogs : String
          }
          
          type MessageDelete{
              id:ID
              emoji : String
              Message : [String]
          }
          union MessageUnion = Messages | err
      `,
    query: `
          type Query {
              messages:[Messages]
              message(_id : String,createdAt:String):MessageUnion
          }
      `,
    mutation: `
          type Mutation {
              addMessage(input : MessageInput):GraphqlUnion
              updateMessage(updateID: String!,update:MessageUpdate):GraphqlUnion
              deleteMessage(id : String!):GraphqlUnion
          }
      `,
  };
  module.exports = typeDefs;
  