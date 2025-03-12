import axios from "axios"
import { IOrderItem, updateOrItem } from "../models/orderItem"
import { API_URL, handleRequest } from "./baseService"

/*  export const fetchOrderItem = async ()=> {
    return await handleRequest<IOrderItem[]>(axios.get(`${API_URL}/order-items`))
} 

export const fetchOrderItemByID = async(id:number) => {
    return await handleRequest<IOrderItem>(axios.get(`${API_URL}/order-items/${id}`))
} */


export const updateOrderItem = async(id:number, payload: updateOrItem): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/order-items/${id}`,payload))
}


export const deleteOrderItem = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/order-items/${id}`))
}