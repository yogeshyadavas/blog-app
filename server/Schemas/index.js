const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;

 const blogData = require("../MOCK_DATA.json");

const {blogType, createType,updateType} = require("./TypeDefs/BlogType");
// Define schema of Query to fetch the data 
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllBloges: {
      type: new GraphQLList(blogType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return blogData;
      },
    },
  },
});

// Define mutation for create ,update ,and delete .
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBlog: {
      type: blogType,
      args: {
        data: { type: createType },
      },
      resolve(parent, args) {
        const id = blogData.length > 0 ? blogData[blogData.length - 1].id + 1 : 1;
        blogData.push({
          id: id,
          heading: args.data.heading,
          date: args.data.date,
          content:args.data.content
        });
        return {id: id};
      },
    },

    updateBlog: {
      type: blogType,
      args: {
        data: { type: updateType },
      },
      resolve(parent, args) {
        const index = blogData.findIndex(blog=> blog.id === args.data.id);
        
        blogData[index] = {
          id: args.data.id,
          heading:args.data.heading,
          date: args.data.date,
          content: args.data.content,
        };
        return {id: args.data.id};
      },
    },
    deleteBlog: {
      type: blogType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let index = blogData.map((blog) => blog.id).indexOf(args.id);
        if (index > -1) {
          blogData.splice(index, 1);
        }
        return {id: args.id};
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
