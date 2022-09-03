const typeDefs = {
    root: `
          type Tickets {
              _id : String
              ticket_type: [String]
              topic: [String]
              first_message: String
              status: String
              service_agent: [String]
              chatLogs: [ChatLogs]
              files: [String]
              studentID: String
              createdAt: String
              updatedAt: String
  
          }
  
          input TicketsInput {
              ticket_type: [String]
              topic: [String]
              first_message: String
              status: String
              service_agent: [String]
              files: [String]
              chatLogs: [String]
              studentID: String
              createdAt: String
              updatedAt: String
          }
  
          input TicketsUpdate {
              ticket_type: [String]
              topic: [String]
              first_message: String
              status: String
              service_agent: [String]
              files: [String]
              studentID: String
              createdAt: String
              updatedAt: String
              chatLogs: [String]
  
          }
          union TicketUnion = Tickets | err
  
          `,
    query: ` type Query {
              tickets : [Tickets]
              ticket (_id : String,createdAt:String): TicketUnion
          }
          `,
    mutation: `type Mutation {
                    addTickets(input : TicketsInput):GraphqlUnion
                    updateTickets(updateID: String!,update:TicketsUpdate):GraphqlUnion
                    deleteTickets(updateID: String!):GraphqlUnion
          }`,
  };
  
  module.exports = typeDefs;
  