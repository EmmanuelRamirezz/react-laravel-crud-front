import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


const endpoint = 'https://react-laravel-crud-production.up.railway.app/api/product/';

const EditProduct = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();
    const {id} = useParams();

    const data = {
        description: description,
        price: price,
        stock: stock,
    };
    useEffect(()=>{
        const getProductsById = async () => {
            try{
                const response = await fetch (`${endpoint}${id}`, {
                    headers: {
                      'Accept': 'application/json',
                      // Otros encabezados si son necesarios
                    }
                  });
                const data = await response.json();
                setDescription(data.description);
                setPrice(data.price);
                setStock(data.stock)
    
                //console.log(data);
            }catch(e){
                console.log('Ups No se pudieron mostrar', e);
            }
        }
        getProductsById();
    },[])
    const update =  async(e) => {
        e.preventDefault();
        if (!data.description){
            alert("Use a valid description");
            return
          }
          if (!data.price){
            alert("Use a valid price");
            return
          }     
        fetch(`${endpoint}${id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': 'XSRF',
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Error en la solicitud PUT');
              }
              //console.log(response.json());
              return response.json();
            })
            .then(data => {
              navigate('/')
              //console.log('Respuesta PUT:', data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        
    }
    return(
        <div className="bg-white 0 w-6/12 mx-auto mt-20 p-12 drop-shadow-xl max-md:w-11/12">
            <h2 className="text-center text-xl font-bold">Edit Product</h2>
            <form onSubmit={update} className="w-8/12 mx-auto mt-8 pt-4 border-t-2 border-blue-400 max-lg:w-11/12">
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Description</label>
                    <input 
                        className="bg-gray-100 w-52 border-2 pl-2 border-gray-300 rounded-md"
                        value={data.description}
                        type="text"
                        onChange={(e)=>setDescription(e.target.value)}
                        min={0}
                    />
                </div>
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Price</label>
                    <input 
                        className="bg-gray-100 w-52 border-2 pl-2 border-gray-300 rounded-md"
                        value={data.price}
                        type="number"
                        onChange={(e)=>setPrice(e.target.value)}
                        min={0}
                    />
                </div>
                <div className="w-11/12 flex justify-between mb-8 max-md:flex max-md:flex-col">
                    <label>Stock</label>
                    <input 
                        className="bg-gray-100 w-52 border-2 pl-2 border-gray-300 rounded-md"
                        value={data.stock}
                        type="number"
                        onChange={(e)=>setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="flex">
                  <Link to="/" className="bg-delete w-24 text-center mx-auto text-lg my-4 block rounded-lg text-white">
                      Cancel
                  </Link>
                  <button type="submit" className="bg-edit w-24 text-center mx-auto text-lg my-4 block rounded-lg text-white">Update</button>
                </div>
            </form>
        </div>
    )
}
export default EditProduct;