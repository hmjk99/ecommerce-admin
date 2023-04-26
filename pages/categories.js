import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)
    const [deleteCategory, setDeleteCategory] = useState(null)
    const [displayDelete, setDisplayDelete] = useState(false) 
    
    const getCategory = () =>{
        axios.get('/api/categories').then(response =>{
            setCategories(response.data)
        })
    }
    const saveCategory = async (e) =>{
        e.preventDefault()
        if (editedCategory) {
            await axios.put('/api/categories', {name, parentCategory, _id:editedCategory._id})
        } else{
            await axios.post('/api/categories', {name, parentCategory})
        }
        setName('')
        getCategory()
        setEditedCategory(null)
    }
    const editCategory = async (category) =>{
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
    }
    const showDelete = async (category) =>{
        setDisplayDelete(true)
        setDeleteCategory(category)
    }
    const hideDelete = () =>{
        setDisplayDelete(false)
    }
    const handleDelete = async (id) =>{
        await axios.delete('/api/categories?id='+id).then((response)=>{
            getCategory()
        })
        hideDelete()
    }

    useEffect(()=>{
        getCategory()
    }, [])

    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category "${editedCategory.name}"` : 'Create Category'}</label>
            <form className="flex gap-1" onSubmit={saveCategory}>
                <input className="mb-0" type="text" placeholder={'Category name'} value={name} onChange={e => setName(e.target.value)}/>
                <select className="mb-0" value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                    <option value="">No Parent Category</option>
                    {categories.length > 0 && categories.map(category =>(
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary">Save</button>
            </form>
            {displayDelete ? 
                <div className="flex items-center mt-2 justify-center">
                    <h3 className="mr-4">Do you really want to delete "{deleteCategory.name}"?</h3>
                    <button className="btn-red mr-2" onClick={()=> handleDelete(deleteCategory._id)}>Yes</button>
                    <button className="btn-primary" onClick={hideDelete}>No</button>
                </div>
                : null
            }
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category =>(
                        <tr>
                            <td>{category.name}</td>
                            <td>{category.parent?.name}</td>
                            <td>
                                <button onClick={()=> editCategory(category)} className="btn-primary mr-1">Edit</button>
                                <button onClick={()=> showDelete(category)} className="btn-primary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}