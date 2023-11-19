const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    password: String
    savedExercises: [Exercise]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    exercise: Exercise
  }

  input ExerciseInput {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createExercise(input: ExerciseInput!): Exercise
    saveExercise(exerciseData: ExerciseInput!): User
  }



  type Exercise {
    _id: ID!
    type: String!
    name: String!
    description: String!
    target: String
  }

`;

module.exports = typeDefs;
