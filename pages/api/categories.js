import { mongooseConnection } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function handler(req, res) {
    const {method} = req
    await mongooseConnection()

    if (method === 'POST') {
        const {name, parentCategory} = req.body
        const categoryDoc= await Category.create({
            name, 
            parent: parentCategory || undefined,
        })
        res.json(categoryDoc)
    }

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'))
    }

    if (method === 'PUT') {
        const {name, parentCategory, _id} = req.body
        const categoryDoc= await Category.updateOne({_id}, {
            name, 
            parent: parentCategory || undefined,
        })
        res.json(categoryDoc)
    }
    if (method === 'DELETE'){
        if (req.query?.id){
            await Category.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}