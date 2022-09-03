module.exports = {
  root: ` 
        type Course {
            _id: String
            course_name: String
            uploadedAt: String
            batch: [Batch]
            sections : [Section]
            challenges : [Challenge]
            modules : [Modules]
            totalVideos : String
            totalAssignments : String
            totalProjects : String
            totalMilestones : String
            createdAt : String
            updatedAt : String
            status : String

        }
        
        input CourseInput {
            _id: String
            course_name: String
            createdAt: String
            uploadedAt: String
            batch: String
            student:String
            status : String
            modules : [String]
            moduleID: String
            courseId : String
        }

        input CourseUpdate {
            _id: String
            course_name: String
            createdAt: String
            uploadedAt: String
            batch: String
            student:String
            modules : [String]
            courseId : String
            moduleID: String
            status : String
        }
        union CourseUnion = Course | err
    `,

  query: `
            type Query {
                courses: [Course]
                course(_id: String,createdAt:String): CourseUnion
            
        }`,
  mutation: `
            type Mutation {
                addCourse(input:CourseInput): GraphqlUnion
                updateCourse(updateID:String,update:CourseUpdate): GraphqlUnion
                deleteCourse(updateID: String!):GraphqlUnion

            }`,
};
