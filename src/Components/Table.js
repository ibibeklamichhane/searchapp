const Table = ({ products }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th> 
          <th>Description</th>
          <th>Price</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}  style={{ border: '1px solid ' }}>
            <td>{product.title.substring(0, 35)}</td> {/* title size reduced to fist 35 words */}
            <td>{product.description.substring(0, 35)}</td>
            <td>{product.price}</td>
            
          </tr>
          
        ))}
      </tbody>
    </table>
  );
};

export default Table;