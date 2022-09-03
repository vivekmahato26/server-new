const typeDefs = {
  root: `
        type EmploymentHistory {
            Title : String
            Employer : String
            StartDate : String
            EndDate : String
            City : String
            Description : String
        }
        type Education{
            School : String
            Degree : String
            StartDate : String
            EndDate : String
            City : String
            Grade : String
        }
        type Courses { 
            CourseName : String
            Institution : String
            StartDate : String
            EndDate : String
        }
        type Resume {
            PersonalDetails : String
            ProfessionalSummary : String
            EmpHistory : [ EmploymentHistory ]
            InternShips : [ EmploymentHistory ]
            Edu : [ Education ]
            SocialMediaLinks : String
            SKills : String
            Experties : String
            ExtraCirculars : String
            Courses : [ Courses ]
            Languages : String
            Hobbies : String
            createdAt : String
            student : Student
            updatedAt : String

        }
        input EmploymentHistoryInput {
            Title : String
            Employer : String
            StartDate : String
            EndDate : String
            City : String
            Description : String
        }
        input EducationInput {
            School : String
            Degree : String
            StartDate : String
            EndDate : String
            City : String
            Grade : String
        }
        input CoursesInput { 
            CourseName : String
            Institution : String
            StartDate : String
            EndDate : String
        }
        input ResumeInput{
            PersonalDetails : String
            ProfessionalSummary : String
            EmploymentHistory : [ EmploymentHistoryInput ]
            InternShips : [ EmploymentHistoryInput ]
            Education : [ EducationInput ]
            SocialMediaLinks : String
            SKills : String
            Experties : String
            ExtraCirculars : String
            Courses : [ CoursesInput ]
            Languages : String
            student : String
            Hobbies : String
        }
        input ResumeUpdate {
            PersonalDetails : String
            ProfessionalSummary : String
            EmploymentHistory : [ EmploymentHistoryInput ]
            InternShips : [ EmploymentHistoryInput ]
            Education : [ EducationInput ]
            SocialMediaLinks : String
            SKills : String
            Experties : String
            ExtraCirculars : String
            Courses : [ CoursesInput ]
            Languages : String
            student : String
            Hobbies : String
        }
        union ResumeUnion = Resume | err
    `,
  query: `
        type Query {
            resumes:Resume
            resume( _id : String,createdAt:String ) : ResumeUnion
        }
    `,
  mutation: `
        type Mutation{
            addResume(input : ResumeInput) : GraphqlUnion
            updateResume (updateId : String! , update : ResumeUpdate) :GraphqlUnion
            deleteResume(updateID: String!):GraphqlUnion

        }
    `,
};

module.exports = typeDefs;
