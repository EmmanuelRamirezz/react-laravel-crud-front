import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts]=useState([]);
    const [searchedProducts, setSearchedProducts]=useState([]);
    const [finalProducts, setFinalProducts]=useState([]);
    const [orderBy, setOrderBy] = useState('');
    //const navigate = useNavigate();
    const endpoint = 'https://react-laravel-crud-production.up.railway.app/api';
    useEffect(()=>{
        getAllProducts();
    },[])

    const getAllProducts = async () => {
        try{
            const response = await fetch (`${endpoint}/products`, {
                headers: {
                  'Accept': 'application/json',
                  // Otros encabezados si son necesarios
                }
              });
            const data = await response.json();
            setProducts(data);
        }catch(e){
            console.log('Ups No se pudieron mostrar', e);
        }
    }
    const deleteProduct = async (id) => {
            fetch(`${endpoint}/product/${id}`, {method:'DELETE'})
            .then(response => {
                if (!response.ok) {
                  throw new Error('Error en la solicitud POST');
                }
                //console.log(response.json());
                getAllProducts();
                return response.json();
            })
            .then(data => {
                //console.log('Respuesta POST:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSelect = (e) => {
        //setOrderBy(e.target.value);
        const optionArray = [...products];
        switch(e.target.value){
            case "option0": 
            setFilteredProducts([]);
            break;
            case "option1": 
            if(searchedProducts.length!=0 && products.length!=0){
                console.log("opcion1");
                setFilteredProducts([]);
                //console.log(searchedProducts, filteredProducts.length);
                setFilteredProducts(searchedProducts.sort((a,b)=>a.price - b.price));
                setSearchedProducts([]);
                console.log(searchedProducts, filteredProducts);
            }else{
                setFilteredProducts(optionArray.sort((a,b)=>a.price - b.price));
            }
            
            break;
            case "option2": 
            if(searchedProducts.length!=0 && products.length!=0){
                console.log("opcion2");
                setFilteredProducts([]); 
                //console.log(searchedProducts, filteredProducts);
                setFilteredProducts(searchedProducts.sort((a,b)=>b.price - a.price));
                setSearchedProducts([]);
                console.log(searchedProducts, filteredProducts);
            }else{
                setFilteredProducts(optionArray.sort((a,b)=>b.price - a.price));
            }
            
            break;
            case "option3": 
                setFilteredProducts(optionArray.sort((a, b) => {
                    const wordA = a.description.split(' ')[0].toLowerCase();
                    const wordB = b.description.split(' ')[0].toLowerCase();
                  
                    return wordA.localeCompare(wordB);
                  }));
            break;
            case "option4": 
            setFilteredProducts(optionArray.sort((a, b) => {
                const wordA = a.description.split(' ')[0].toLowerCase();
                const wordB = b.description.split(' ')[0].toLowerCase();
              
                return wordB.localeCompare(wordA);
              }));
            break;
            case "option5": 
            setFilteredProducts(optionArray.sort((a,b)=>b.stock - a.stock));
            break;            
        }
    }
    const search = (term, array) => {
        const fields =["description", "price", "stock"];
        return array.filter((obj) => {
            return fields.some((field) => {
              const fieldValue = obj[field];
        
              if (fieldValue && (typeof fieldValue === 'string' || typeof fieldValue === 'number')) {
                return String(fieldValue).toLowerCase().includes(term.toLowerCase());
              }
              return false;
            });
          });
    };
    const handleSearch = (e)=>{
        console.log(e.target.value);
        //var term = e.target.value;
        if(filteredProducts.length){
            console.log(search(e.target.value, filteredProducts));
            setSearchedProducts(search(e.target.value, filteredProducts));
            if(e.target.value==""){
                setSearchedProducts(filteredProducts)
            }
        }else{
            setSearchedProducts(search(e.target.value, products));
            console.log(search(e.target.value, products));
            if(e.target.value==""){
                setSearchedProducts(products)
            }
        }
    }
    useEffect(()=>{
        // if(searchedProducts.length!=0 && filteredProducts.length!=0){
        //     const combinedArray = searchedProducts.map((item1) => {
        //         const matchingItem = filteredProducts.find((item2) => item2.id === item1.id);
              
        //         // Si hay un elemento coincidente, combinarlo
        //         if (matchingItem) {
        //           return { ...item1, ...matchingItem };
        //         }
              
        //         // Si no hay coincidencia, devolver solo el elemento del primer array
        //         return item1;
        //       });
        //       setFinalProducts(combinedArray);
        //       console.log(combinedArray);
        // }
        // else 
        //checar esto, las 2 condiciones se cumplen
        if(searchedProducts.length!=0){
            setFinalProducts(searchedProducts)
        }else if(filteredProducts.length!=0){
            setFinalProducts(filteredProducts)
        }


        //console.log(searchedProducts, filteredProducts);
        console.log(finalProducts);
    },[filteredProducts, searchedProducts])




    return(
        <div className="bg-white 0 w-6/12 mx-auto mt-20 p-12 drop-shadow-xl max-md:w-11/12">
            <h1 className="text-center text-xl font-bold">Crud of products with React + Laravel + MySQL</h1>
            <Link className="bg-create w-36 text-center ml-auto mr-4 text-lg my-4 block rounded-lg" to="/create">
                <p className="text-white">Create Product</p>
            </Link>
            <div className="flex justify-between my-4 max-lg:flex-col">
                <div className="max-lg:mx-auto max-lg:mb-8">
                    <select placeholder="Order by" onChange={handleSelect} className="border-2 border-gray-200 w-52">
                        <option value="option0" >Order By</option>
                        <option value="option1">Low to high price</option>
                        <option value="option2">High to low price</option>
                        <option value="option3">By name: A - Z</option>
                        <option value="option4">By name: Z - A</option>
                        <option value="option5">By stock first</option>
                    </select>
                </div>
                <div className="flex items-center max-lg:mx-auto">
                    <input type="text" placeholder="Search" className="border-2 border-gray-200" onChange={handleSearch}/>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <table className="bg-white w-11/12 mx-auto">
                <thead className="border-b-2 border-blue-400">
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                        {finalProducts.length ? 
                            (finalProducts.map((product)=>(
                                <tr key={product.id} className="h-12 border-b-2 border-gray-200">
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
        
                                    <td className="flex justify-center gap-4 my-3">
                                        <Link title="Edit" className="bg-edit w-8 h-8 rounded-lg my-auto" to={`/edit/${product.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto mt-0.5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
        
                                        </Link>
                                        <div title="Delete" className="bg-delete w-8 h-8 my-auto rounded-lg hover:cursor-pointer" onClick={()=>deleteProduct(product.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto mt-0.5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            ))) 
                        : 
                        ((products.map((product)=>(
                            <tr key={product.id} className="h-12 border-b-2 border-gray-200">
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
    
                                <td className="flex justify-center gap-4 my-3">
                                    <Link title="Edit" className="bg-edit w-8 h-8 rounded-lg my-auto" to={`/edit/${product.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto mt-0.5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
    
                                    </Link>
                                    <div title="Delete" className="bg-delete w-8 h-8 my-auto rounded-lg hover:cursor-pointer" onClick={()=>deleteProduct(product.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-auto mt-0.5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ))))}                  
                </tbody>
            </table>
        </div>
    )
}
export default ShowProducts;