import axios from "axios";
import { IProduct, updateProd } from "../models/product";
import { API_URL, handleRequest } from "./baseService";

export const fetchProducts = async ()=> {
    return await handleRequest<IProduct[]>(axios.get(`${API_URL}/products`))
}

export const fetchProductByID = async(id:number) => {
    return await handleRequest<IProduct>(axios.get(`${API_URL}/products/${id}`))
}


export const createProduct = async(payload: IProduct) => {
    return await handleRequest<IProduct>(axios.post(`${API_URL}/products`, payload))
}

export const updateProduct = async(id:number, payload: updateProd): Promise<IProduct> => {
    return await handleRequest<IProduct>(axios.patch(`${API_URL}/products/${id}`,payload))
}


export const deleteProduct = async(id:string): Promise<void> => {
    return await handleRequest<void>(axios.delete(`${API_URL}/products/${id}`))
}