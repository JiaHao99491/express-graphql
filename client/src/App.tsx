import "bootstrap/dist/css/bootstrap.css";
import { AddProduct } from "./AddProduct";
import { useQuery } from '@apollo/client';
import { CATEGORIES_PRODUCT } from "./query";
import { ProductList } from "./ProductList";
import { useState } from "react";
import { Product } from "./types";
import { ProductDetail } from "./ProductDetail";

const App = () => {
    const [product, setProduct] = useState<Product>()
    const {loading, error, data} = useQuery(CATEGORIES_PRODUCT)
    if(error){
        return <p>加载发生错误</p>
    }
    if(loading){
        return <p>加载中</p>
    }
    const {getCategories, getProducts} = data
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
                <AddProduct categories={getCategories}/>
            </div>
            <div className="panel-body">
                <ProductList products={getProducts}  setProduct={setProduct}/>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body">
                <ProductDetail product={product}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
