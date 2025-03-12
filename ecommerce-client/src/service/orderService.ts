import axios from "axios"
import { IOrder, Order, updateOrd } from "../models/order"
import { IOrderItem } from "../models/orderItem"
import { API_URL, handleRequest } from "./baseService"

export const fetchOrders = async ()=> {
    return await handleRequest<IOrder[]>(axios.get(`${API_URL}/orders`))
}

export const fetchOrderByID = async(id:number) => {
    return await handleRequest<IOrder>(axios.get(`${API_URL}/orders/${id}`))
}


export const createOrder = async(payload: Order) => {
    return await handleRequest<Order>(axios.post(`${API_URL}/orders`, payload))
}

export const updateOrder = async(id:number, payload: updateOrd): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/orders/${id}`,payload))
}


export const deleteOrder = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/orders/${id}`))
}