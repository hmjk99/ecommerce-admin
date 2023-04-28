import { mongooseConnection } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnection()
    res.json(await Order.find().sort({createdAt:-1}))
}