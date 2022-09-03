module.exports = {
  root: ` 
        type Coupon {
            id: String
            code: String
            description: String
            type: String
            expire: String
            disount: String
            max_discount: String
            uploadedAt: String
            createdAt : String
            updatedAt : String
        }
        
        input CouponInput {
            id: String
            code: String
            description: String
            type: String
            expire: String
            disount: String
            max_discount: String
            createdAt: String
            uploadedAt: String
        }

        input CouponUpdate {
            id: String
            code: String
            description: String
            type: String
            expire: String
            disount: String
            max_discount: String
            createdAt: String
            uploadedAt: String

        }
        union CouponUnion = Coupon | err
    `,

  query: `
            type Query {
                coupons: [Coupon]
                coupon(_id: String,createdAt:String): CouponUnion
            
        }`,
  mutation: `
            type Mutation {
                addCoupon(input:CouponInput): GraphqlUnion
                updateCoupon(updateID:String,update:CouponUpdate): GraphqlUnion
                deleteCoupon(updateID: String!):GraphqlUnion

            }`,
};
