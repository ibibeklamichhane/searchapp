import React, { useState} from 'react';

import Modal from 'react-modal';

import Table from "./Table";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };
  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
 
  const searchProducts = async () => {
    
    try {
     //Api  from fakestore
     let url = `https://fakestoreapi.com/products/`;

    //category change product are fetched 

     if (category) {
      url += `/category/${category}`;
    }

    //first all the produts are fetched 
      const response = await fetch(url);
      let data = await response.json();
      console.log('search',data);

      //Then all the products are compared and displayed on price range
      if (priceRange) {
        //using switch case to separate the price range
        switch (priceRange) {
          case 'above20':
            data = data.filter((product) => product.price > 20);
            break;
          case 'above50':
            data = data.filter((product) => product.price > 50);
            break;
          case 'above100':
            data = data.filter((product) => product.price > 100);
            break;
          case 'above200':
            data = data.filter((product) => product.price > 200);
            break;
          case 'above500':
            data = data.filter((product) => product.price > 500);
            break;
          default:
            break;
        }
      }
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  //remove word sensitivity by converting into lower case

  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container d-flex align-items-center justify-content-center" >
      <div className=" center-block">
    
        <input  className='text-align:center'
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
        />
    </div>



     
      <button type="button" class="btn btn-success col-sm-1" onClick={handleSearchClick} style={{ marginLeft: '10px' }}><i class="fa fa-search"></i></button>

 {/* model launch to display popup */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
      >
      
      
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
        {/*  */}
      </select>
  
      {/* dropdown for price range */}
      <select value={priceRange} onChange={handlePriceRangeChange}>
        <option value="">All Prices</option>
        <option value="above20">Above $20</option>
        <option value="above50">Above $50</option>
        <option value="above100">Above $100</option>
        <option value="above200">Above $200</option>
        <option value="above500">Above $500</option>
      </select>

       {/* <button onClick={searchProducts}>Search</button> */}
      
      <button type="button" class="btn btn-secondary search-button" onClick={searchProducts}style={{ marginLeft: '10px' }} >Search</button>
      
       {/* tabulated format  product display*/}
       {isModalOpen && (
        <div
          style={{
            border: '1px solid black',
            padding: 'px',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <p style={{ textAlign: 'left', margin: '0' }}> ↑↓ to navigate   ↲ to select   'Esc' to Exit</p>
        </div>
      )}
       {filteredProducts.map((product) => (
          <div key={product.id}>
            <h5>{product.title.slice(0, 40)}</h5>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description.slice(0, 80)}...</p>
            <hr />
            
          </div>
          
        ))}
      </Modal>
    </div>
  );
};


export default SearchBar;


