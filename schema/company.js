const typeDefs = {
  root: `
        type Company {
            _id : String
            Name : String
            Logo : String
            Description : String
            JobPostedId : String
            Images : String
            createdAt : String
            updatedAt : String

        }
        input CompanyInput{
            Name : String
            Logo : String
            Description : String
            JobPostedId : String
            Images : String
        }
        input CompanyUpdate{
            Name : String
            Logo : String
            Description : String
            JobPostedId : String
            Images : String
        }
        union CompanyUnion = Company | err
    `,
  query: `
        type Query {
            companies : [Company]
            company (_id : String,createdAt:String ) : CompanyUnion
        }
    `,
  mutation: `
        type Mutation{
            addCompany(input : CompanyInput) : GraphqlUnion
            updateCompany (updateID : String!,update:CompanyUpdate): GraphqlUnion
            deleteCompany(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
