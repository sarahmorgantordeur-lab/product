import { useState } from "react";

export default function ProductList( { products, handleDelete, handleEdit }) {
  const [productList, setProductList] = useState([]);

  //   const handleChange = (e) => {
  //     setProductList({ ...productList, [e.target.name]: e.target.value });
  //     console.log(productList);
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit(productList);
  //   };

  const ProductCard = ({ product, handleDelete, handleEdit }) => {
    return (
      <div className="bg-200 rounded-lg">
        <div className="bg-200 rounded-lg flex flex-col">
          <h2 className="font-bold text-xl">{product.name}</h2>
          <span className="font-bold">Prix : {product.price}</span>
          <span className="font-bold">stock :  {product.stock} </span>
          <div className="flex flex-wrap m-0.5">
            <button 
            onClick={() => handleEdit(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:oultine-none focus:ring-2 focus:ring-blue-500">
              Modifier
            </button>

            <button 
            onClick={() => handleDelete(product.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:oultine-none focus:ring-2 focus:ring-red-500">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };


    return (
      <div className="bg-gray-200 flex flex-wrap rounded-lg">
        <h1 className="font-bold text-2xl">Liste des poduits</h1>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} handleDelete={handleDelete} handleEdit={handleEdit}/>
        ))}
      </div>
    );
}
