import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('')
    const [parentCategory, setParentCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [properties, setProperties] = useState([])
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
        const data = {
            name, 
            parentCategory, 
            properties:properties.map(p => ({
                name:p.name, 
                values:p.values.split(','),
            }))
        }
        if (editedCategory) {
            data._id = editedCategory._id, 
            await axios.put('/api/categories', data)
            setEditedCategory(null)
        } else{
            await axios.post('/api/categories', data)
        }
        setName('')
        getCategory()
        setParentCategory('')
        setProperties([])
    }
    const editCategory = async (category) =>{
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category.parent?._id)
        setProperties(category.properties.map(({name, values})=>({
            name,
            values:values.join(',')
        })))

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
    const addProperty = () =>{
        setProperties(prev =>{
            return [...prev, {name:'', values:''}]
        })
    }
    const handlePropertyNameChange = (index, property, newName) =>{
        setProperties(prev => {
            const properties = [...prev]
            properties[index].name = newName
            return properties
        })
    }
    const handlePropertyValuesChange = (index, property, newValues) =>{
        setProperties(prev => {
            const properties = [...prev]
            properties[index].values = newValues
            return properties
        })
    }
    const removeProperty = (indexToRemove) =>{
        setProperties(prev =>{
            return [...prev].filter((p, pIndex)=>{
                return pIndex !== indexToRemove
            })
        })
    }

    useEffect(()=>{
        getCategory()
    }, [])

    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category "${editedCategory.name}"` : 'Create Category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input type="text" placeholder={'Category name'} value={name} onChange={e => setName(e.target.value)}/>
                    <select value={parentCategory} onChange={e => setParentCategory(e.target.value)}>
                        <option value="">No Parent Category</option>
                        {categories.length > 0 && categories.map(category =>(
                            <option key={category.name} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button onClick={addProperty} type="button" className="btn-default text-sm mb-2">Add New Property</button>
                    {properties.length > 0 && properties.map((property,index) =>(
                        <div key={property.name} className="flex gap-1 mb-2">
                            <input className="mb-0" type="text" value={property.name} onChange={(e)=>handlePropertyNameChange(index, property, e.target.value)} placeholder="property name (example: color)"/>
                            <input className="mb-0" type="text" value={property.values} onChange={(e)=>handlePropertyValuesChange(index, property, e.target.value)} placeholder="values, comma separated"/>
                            <button className="btn-default" type="button" onClick={() => removeProperty(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button type="button" onClick={() => {
                            setEditedCategory(null)
                            setName('')
                            setParentCategory('')
                            setProperties([])
                        }} 
                        className="btn-red">Cancel</button>
                    )}
                    <button type="submit" className="btn-primary">Save</button>
                </div>
            </form>
            {displayDelete ? 
                <div className="flex items-center mt-2 justify-center">
                    <h3 className="mr-4">Do you really want to delete &quot;{deleteCategory.name}&quot;?</h3>
                    <button className="btn-red mr-2" onClick={()=> handleDelete(deleteCategory._id)}>Yes</button>
                    <button className="btn-primary" onClick={hideDelete}>No</button>
                </div>
                : null
            }
            {!editedCategory && (
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
                        <tr key={category.name}>
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
            )}
        </Layout>
    )
}