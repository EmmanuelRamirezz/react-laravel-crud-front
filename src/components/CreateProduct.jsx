import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const endpoint = 'https://react-laravel-crud-production.up.railway.app/api/product';
const CreateProduct = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    const navigate = useNavigate();

    const data = {
        description: description,
        price: price,
        stock: stock,
    };

    const store = async (e) => {
        e.preventDefault();
          if (!data.description){
            alert("Use a valid description");
            return
          }
          if (!data.price){
            alert("Use a valid price");
            return
          }     
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (!response.ok) {
                console.log(response);
                throw new Error('Error en la solicitud POST');
              }
              //console.log(response.json());
              //return response.json();
            })
            .then(data => {
              navigate('/');
              //console.log('Respuesta POST:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        
    }

    return(
        <div className="bg-white 0 w-6/12 mx-auto mt-20 p-12 drop-shadow-xl max-md:w-11/12">
            <h2 className="text-center text-xl font-bold">Create Product</h2>
            <form onSubmit={store} className="w-8/12 mx-auto mt-8 pt-4 border-t-2 border-blue-400 max-lg:w-11/12">
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Description:</label>
                    <input 
                        className="bg-gray-100 w-52 border-2 pl-2 border-gray-300 rounded-md"
                        value={data.description}
                        type="text"
                        onChange={(e)=>setDescription(e.target.value)}
                        title="Description"
                    />
                </div>
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Price:</label>
                    <input 
                        className="bg-gray-100 w-52  border-2 pl-2 border-gray-300 rounded-md"
                        value={data.price}
                        type="number"
                        onChange={(e)=>setPrice(e.target.value)}
                        title="Price"
                        min={0}
                    />
                </div>
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Stock:</label>
                    <input 
                        className="bg-gray-100 w-52  border-2 pl-2 border-gray-300 rounded-md"
                        value={data.stock}
                        type="number"
                        onChange={(e)=>setStock(e.target.value)}
                        title="Stock"
                        min={0}
                        required
                    />
                </div>
                <div className="flex">
                  <Link to="/" className="bg-delete w-24 text-center mx-auto text-lg my-4 block rounded-lg text-white">
                      Cancel
                  </Link>
                  <button type="submit" className="bg-create w-24 text-center mx-auto text-lg my-4 block rounded-lg text-white">Save</button>
                </div>
            </form>
        </div>
    )
}
export default CreateProduct;