import { gql } from '@apollo/client';

export const CATEGORIES_PRODUCT = gql`
query CATEGORIES_PRODUCT {
  getCategories{
    id,
    name,
    products{
      id,
      name
    }
  },
  getProducts{
    id,
    name,
    category{
      id,
      name,
      products{
        id,
        name
      }
    }
  }
}
`

export const ADD_PRODUCT = gql`
mutation ADD_PRODUCT($name:String!,$categoryId:String!){
    addProduct(name:$name, category:$categoryId){
        id,
        name,
        category{
            id,
            name
        }
    }
}
`

export const GETPRODUCTS = gql`
query GETPRODUCTS{
  getProducts{
    id,
    name,
    category{
      id,
      name,
      products{
        id,
        name
      }
    }
  }
}
`