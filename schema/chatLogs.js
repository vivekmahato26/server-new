const typeDefs = {
    root: `
          type ChatLogs {
            _id: String
              user:String
              messages : [Messages]
              ticket: Tickets
              createdAt : String
              updatedAt : String
  
          }
          input ChatLogsInput{
              user:String
              messages : [String]
              ticket: String
          }
          input ChatLogsUpdate{
              user:String
              messages : [String]
              ticket : String
          }
          union ChatLogsUnion = ChatLogs | err
      `,
  
    query: `
          type Query {
              chatlogs : [ChatLogs]
              chatlog(_id :String,createdAt:String):ChatLogsUnion
          }
      `,
    mutation: `
          type Mutation {
              addChatLogs (input : ChatLogsInput):GraphqlUnion
              updateChatLogs(updateID:String!,update:ChatLogsUpdate):GraphqlUnion
          }
      `,
  };
  
  module.exports = typeDefs;
  