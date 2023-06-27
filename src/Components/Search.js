import React, { useState } from 'react';
import Table from "./Table";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const searchProducts = async () => {
    
    try {
     //Api  from fakesite   
      const response = await fetch(`https://fakestoreapi.com/products?q=${searchTerm}`);
      const data = await response.json();
      console.log('search',data);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  //removing word sensitivity by converting into lower case
  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
      />



      <button onClick={searchProducts}>Search</button>

      {<Table products={filteredProducts}  style={{ border: '1px solid red' }}/>}
    </div>
  );
};


export default SearchBar;


 {/*    <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.price}</li>
          


        ))}
      </ul> */}

 {/* */}