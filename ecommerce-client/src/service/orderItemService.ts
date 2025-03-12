import axios from "axios"
import { IOrderItem, updateOrItem } from "../models/orderItem"
import { API_URL, handleRequest } from "./baseService"

 export const fetchOrderItem = async ()=> {
    return await handleRequest<IOrderItem[]>(axios.get(`${API_URL}/orderItem`))
} 

export const fetchOrderItemByID = async(id:number) => {
    return await handleRequest<IOrderItem>(axios.get(`${API_URL}/orderItem/${id}`))
}


export const updateOrderItem = async(id:number, payload: updateOrItem): Promise<IOrderItem> => {
    return await handleRequest<IOrderItem>(axios.patch(`${API_URL}/orderItem/${id}`,payload))
}


export const deleteOrderItem = async(id:number)=> {
    return await handleRequest(axios.delete(`${API_URL}/orderItem/${id}`))
}