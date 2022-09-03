module.exports = {
  root: `
        type Address {
            _id:String
            Flat : String
            HomeNo : String
            Street : String
            Town : String
            Village : String
            Landmark : String
            District : String
            State : String
            Pin : Int
            Country : String
            createdAt : String
            updatedAt : String

        }
        input AddressInput {
            Flat : String
            HomeNo : String
            Street : String
            Town : String
            Village : String
            Landmark : String
            District : String
            State : String
            Pin : Int
            Country : String
        }
        input AddressUpdate {
            Flat : String
            HomeNo : String
            Street : String
            Town : String
            Village : String
            Landmark : String
            District : String
            State : String
            Pin : Int
            Country : String
        }    
        union AddressUnion = Address | err
    `,
  query: `
    type Query {
        addresses : [Address]
        address (_id : String,createdAt:String ) : AddressUnion
    }
    `,
  mutation: `
    type Mutation {
        addAddress(input: AddressInput): GraphqlUnion
        updateAddress(updateID: String!,update:AddressUpdate):GraphqlUnion
        deleteAddress(updateID: String!):GraphqlUnion

    }
    `,
};
