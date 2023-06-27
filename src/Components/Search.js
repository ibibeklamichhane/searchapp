import React, { useState } from 'react';
import Table from "./Table";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

 
  const searchProducts = async () => {
    
    try {
     //Api  from fakesite 
     let url = `https://fakestoreapi.com/products/?`;
     if (searchTerm) url += `q=${searchTerm}&`;
     if (category) {
      url += `category=${category}&`;
    }
     
      const response = await fetch(url);
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


      <select value={category} onChange={handleCategoryChange}>

        <option value="">Search Categories</option>
        <option value="electronics">electronics</option>
        <option value="jewelery">jewelery</option>
        <option value="clothing">men's clothing</option>
        <option value="wclothing">women's clothing</option>
        {/* Add more category options as needed */}
      </select>
  

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