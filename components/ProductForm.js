
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category:existingCategory,
    properties:existingProperties
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [category, setCategory] = useState(existingCategory || '')
    const [categories, setCategories] = useState([])
    const [productProperties, setProductProperties] = useState(existingProperties || {})
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        axios.get('/api/categories').then(response =>{
            setCategories(response.data)
        })
    }, [])

    async function saveProduct(e) {
        const data = {title,description,price,images,category, properties:productProperties}
        e.preventDefault()
        if (_id){
            //update
            await axios.put('/api/products', {...data,_id})
        } else{
            //create product
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    const uploadImages = async (e) =>{
        const files = e.target?.files
        if (files?.length > 0){
            const data = new FormData()
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)
            setImages(oldImages =>{
                return [...oldImages, ...res.data.links]
            })
        }
    }

    const setProductProp = (propName,value) =>{
        setProductProperties(prev =>{
            const newProductProps = {...prev}
            newProductProps[propName] = value
            return newProductProps
        })
    }

    const propertiesToFill = [] //watch 5:03:00 for explanation
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id})=> _id === category)
        propertiesToFill.push(...catInfo.properties)
        while(catInfo?.parent?._id) {
            const parentCat = categories.find(({_id})=> _id === catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat
        }
    }

    if(goToProducts){
        router.push('/products')
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type='text' placeholder='product name' value={title} onChange={e => setTitle(e.target.value)}/>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(category =>(
                    <option key={category.name} value={category._id}>{category.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div key={p.name} className='flex gap-1'>
                    <div>{p.name}</div>
                    <select value={productProperties[p.name]} onChange={(e)=> setProductProp(p.name, e.target.value)}>
                        {p.values.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}
            <label>Images</label>
            <div className='mb-2 flex flex-wrap gap-2'>
                {!!images?.length && images.map(link =>(
                    <div className='h-24' key={link}>
                        <img src={link} alt="" className='rounded-lg'/>
                    </div>
                ))}
                <label className='cursor-pointer w-24 h-24 flex flex-col items-center justify-center text-gray-500 rounded-lg bg-gray-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <div>Upload</div>
                    <input type="file" className='hidden'onChange={uploadImages}/>
                </label>
            </div>
            <label>Description</label>
            <textarea placeholder='description' value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <label>Price (in USD)</label>
            <input type='number' placeholder='price' value={price} onChange={e => setPrice(e.target.value)}/>
            <button type='submit' className='btn-primary'>Save</button>
        </form>
    )
}