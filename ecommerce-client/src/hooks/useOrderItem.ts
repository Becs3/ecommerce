import { useState } from "react"
import { IOrderItem, updateOrItem } from "../models/orderItem";
import { deleteOrder, fetchOrders } from "../service/orderService";
import { fetchOrderItemByID, updateOrderItem } from "../service/orderItemService";
import { IOrder } from "../models/order";


export const useOrderItem = () => {
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

     const fetchOrderItemsHandler = async() => {
        setIsLoading(true);

        try {
            const data = await fetchOrders();
            setOrders(data);
        } catch(error){
            setError("Problem fetching orders")
            throw error;
        } finally {
            setIsLoading(false);
        }
    } 

    const fetchOrderItemByIdHandler = async(id:number) => {
        setIsLoading(true);

        try {
            return await fetchOrderItemByID(id);
        } catch(error){
            setError("Problem fetching orderItem")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateOrderItemHandler = async(id:number, payload:updateOrItem) => {
        setIsLoading(true);

        try {
            return await updateOrderItem(id, payload);
        } catch(error){
            setError("Problem updating order")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteOrderItemHandler = async(id:number) => {
        setIsLoading(true);

        try {
            await deleteOrder(id);
            const newOrderItems = orderItems.filter(oi => oi.id !== id);
            setOrderItems(newOrderItems)
        } catch(error){
            setError("Problem fetching orderItem")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        orderItems, 
        isLoading, 
        error,  
        fetchOrderItemsHandler,
        fetchOrderItemByIdHandler,
        updateOrderItemHandler,
        deleteOrderItemHandler
    }
}

function setOrders(data: IOrder[]) {
    throw new Error("Function not implemented.");
}
