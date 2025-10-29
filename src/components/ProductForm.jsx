import { useState, useEffect } from 'react'


export default function ProductForm ({ onSubmit, product }) {
    const [formData, setFormData] = useState({
        name:'',
        description: '',
        price:0, 
        stock:0,
    })


    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                stock: product.stock || '',
            })
        } else {
            setFormData({ name: '', description: '', price: '', stock:'' })
        }
    }, [product])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
        });
    }

    return (
      <div className="rounded-md bg-gray-100 py-6 px-4 items-center text-center justify-center">
        <h1 className="flex text-xl font-bold m-0.5rem">Ajouter un produit</h1>
        <form 
        onSubmit={handleSubmit}
        className="max-h-30 rounded-md flex flex-rwap">

          <div className="rounded-md bg-gray-100 py-6 px-4 grid grid-col space-around">
            <h2 className="font-bold">Nom du produit</h2>
            <input 
            type='name'
            id='name'
            name='name'
            required
            value={formData.name}
            onChange={handleChange}
            className="rounded-md bg-white py-6 px-4 flex flex-col">
            </input>
          </div>

          <div className="rounded-md bg-gray-100 py-6 px-4 flex flex-col">
            <h2 className="font-bold">Prix</h2>
            <input 
            type='number'
            id='price'
            name='price'
            required
            value={formData.price}
            onChange={handleChange}
            step='0.01'
            min='0'
            className="rounded-md bg-white py-6 px-4 flex flex-col">
            </input>
          </div>

          <div className="rounded-md bg-gray-100 py-6 px-4 flex flex-col">
            <h2 className="font-bold">Stock</h2>
            <input 
            type='number'
            id='stock'
            name='stock'
            required
            value={formData.stock}
            onChange={handleChange}
            step='1'
            min='0'
            className="rounded-md bg-white py-6 px-4 flex flex-col">
            </input>
          </div>

          <button 
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:blue-red-700 focus:oultine-none focus:ring-2 focus:ring-blue-500'>
            Ajouter
          </button>

        </form>
      </div>
    );
}