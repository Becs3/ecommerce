import axios from "axios"
import { IOrderItem, OrderItem, updateOrItem } from "../models/orderItem"
import { API_URL, handleRequest } from "./baseService"

export const createOrderItem = async(payload: OrderItem) => {
    return await handleRequest<OrderItem>(axios.post(`${API_URL}/orders-items`, payload))
}

export const updateOrderItem = async(id:number, payload: updateOrItem): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/order-items/${id}`,payload))
}


export const deleteOrderItem = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/order-items/${id}`))
}