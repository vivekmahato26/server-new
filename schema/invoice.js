module.exports = {
  root: `
    type Invoice {
        _id :String
        student : Student
        subscriptions : Subscription
        order : Order
        payment : Payment
        createdAt : String
        updatedAt : String
    }
    input InvoiceInput {
        student : String
        subscriptions : String
        order : String
        payment:String
        createdAt : String
        updatedAt : String
    }
    input InvoiceUpdate{
        student : String
        subscriptions : String
        payment:String
        order : String
        createdAt : String
        updatedAt : String
    }
    union InvoiceUnion = Invoice | err
    `,
  query: `
        type Query { 
            invoices :[Invoice]
            invoice (_id:String,createdAt:String):InvoiceUnion
        }
    `,
  mutation: `
        type Mutation{
            addInvoice (input:InvoiceInput):GraphqlUnion 
            updateInvoice(updateID:String,update:InvoiceUpdate): GraphqlUnion
            deleteInvoice(invoiceID: String!):GraphqlUnion
        }
    `,
};
