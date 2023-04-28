import { Schema, model, models } from "mongoose";


const OrderSchema = new Schema({
    line_items: Object,
    name:String,
    email:String,
    street:String,
    city:String, 
    state:String,
    postal:String,
    paid:Boolean,
}, {
    timestamps: true,
})

export const Order = models?.Order || model('Order', OrderSchema)