import Layout from '@/components/Layout'
import Link from "next/link"
import { useEffect, useState } from 'react'
import axios from 'axios'

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('/api/products').then(response =>{
            setProducts(response.data);
        })
    }, [])
  return (
    <Layout>
        <Link className='bg-blue-800 text-white rounded-md py-1 px-2' href={'/products/new'}>Add New Product</Link>
        <table className='basic mt-2'>
            <thead>
                <tr>
                    <td>Product Name</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {products.map(product =>(
                    <tr>
                        <td>{product.title}</td>
                        <td>
                            <Link href={'/products/edit/'+product._id}>Edit</Link>
                            <Link href={'/products/delete/'+product._id}>Delete</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Layout>
  )
}

export default Products