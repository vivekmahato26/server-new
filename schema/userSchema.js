const typeDefs = {
  root: `
  type User {
      _id :String
      userID : String 
      email: String!
      password: String
      address: Address
      createdAt : String
      updatedAt : String
      userType : String
      }

      type AuthData {
        email :String
        userID :String
        token: String
        tokenExpiration: String
        userType : String

      }
    
      input UserInput {
        address : String
        email: String!
        password: String
        createdAt : String
        updatedAt : String
        userType : String
      }

      input UserUpdate {
        email: String!
        password: String
        createdAt : String
        updatedAt : String
        userType : String
      }

      union UserUnion = User | err
    `,

  query: `type Query {
      Users: [User]
      login(email: String!, password: String!, userType:String!): AuthData!
      getUser: [User]
    }`,
  mutation: `type Mutation {
      createUser(input: UserInput): GraphqlUnion
      updateUser(updateID: String!,update:UserUpdate):GraphqlUnion
      }`,
};

module.exports = typeDefs;
