import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} from "graphql"
import { CategoryModel, ProductModel } from "./model"

const Category: GraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    products: {
      type: new GraphQLList(Product),
      resolve(parent) {
        return ProductModel.find({
          category: parent.id,
        });
      },
    },
  }),
});

const Product: GraphQLObjectType  = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    category: {
      type: Category,
      resolve(parent) {
        return CategoryModel.findById(parent.category);
      },
    },
  }),
});

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getCategory: {
      type: Category,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        return CategoryModel.findById(args.id);
      },
    },
    getCategories: {
      type: new GraphQLList(Category),
      args: {},
      resolve(parent, args) {
        return CategoryModel.find();
      },
    },
    getProduct: {
      type: Product,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        return ProductModel.findById(args.id);
      },
    },
    getProducts: {
      type: new GraphQLList(Product),
      args: {},
      resolve(parent, args) {
        return ProductModel.find();
      },
    },
  },
});
const RootMutation: GraphQLObjectType = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addCategory: {
      type: Category,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        return CategoryModel.create(args);
      },
    },
    addProduct: {
      type: Product,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        category: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        return ProductModel.create(args);
      },
    },
  },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});