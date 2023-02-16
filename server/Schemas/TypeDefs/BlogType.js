const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLInt, GraphQLString } = graphql;

const blogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLInt},
    heading:{type: GraphQLString},
    date: {type: GraphQLString},
    content: { type: GraphQLString },
  }),
});

const createType = new GraphQLInputObjectType({
  name: "CreateType",
  fields: () => ({
    heading: {type: GraphQLString},
    date: {type: GraphQLString},
    content: { type: GraphQLString },
  }),
});
const updateType = new GraphQLInputObjectType({ 
  name: "UpdateType",
  fields: () => ({
    id: {type: GraphQLInt},
    heading:{type:GraphQLString},
    date: {type: GraphQLString},
    content: { type: GraphQLString },
  }),
});

module.exports = {blogType, createType, updateType};
