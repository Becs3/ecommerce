import { RowDataPacket } from "mysql2";
import { IOrderItem } from "./orderItem";

export interface IOrder extends RowDataPacket {
  id: number
  customer_id: number
  total_price: number
  payment_status: string
  payment_id: string
  order_status: string
  created_at: string
  customer_firstname: string
  customer_lastname: string
  customer_email: string
  customer_phone: string
  customer_street_address: string
  customer_postal_code: string
  customer_city: string
  customer_country: string
  customers_created_at: string
  order_items: IOrderItem[]
}

export class Order {
    public id: number = Math.random();
    public created_at: string = new Date().toISOString();

    constructor(
        public customer_id: number,
        public total_price: number,
        public payment_status: string,
        public payment_id: string,
        public order_status: string,
        public customer_firstname: string,
        public customer_lastname: string,
        public customer_email: string,
        public customer_phone: string,
        public customer_street_address: string,
        public customer_postal_code: string,
        public customer_city: string,
        public customer_country: string,
        public customers_created_at: string,
        public order_items: IOrderItem[]
    ) {}
}

export type updateOrd = Pick<IOrderItem, "quantity">