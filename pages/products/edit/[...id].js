import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [existingProduct, setExistingProduct] = useState(null)
    const router = useRouter()
    const {id} = router.query

    useEffect(()=>{
        if (!id) {
            return
        }
        axios.get('/api/products?id='+id).then(response => {
            setExistingProduct(response.data);
        })
    }, [id])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {existingProduct && (
                <ProductForm {...existingProduct}/>
            )}
        </Layout>
    )
}