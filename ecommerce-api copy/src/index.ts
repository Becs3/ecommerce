import dotenv from "dotenv";
import express, {Request, Response} from "express";
import {connectDB} from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { IOrder } from "./models/IOrder";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})


const stripe = require('stripe')(process.env.SECRET_KEY);

app.post('/stripe/create-checkout-session-hosted', async (req: Request, res: Response) => {
  const order: IOrder = req.body;
  const items = order?.order_items;

  const lineItems = items.map((item) => {

    if(!item){console.log ("no item")}

    return {
    price_data: {
      currency: 'SEK',
      product_data: {
        name: item.product_name,
      },
      unit_amount: (item.unit_price) * 100,
    },
    quantity: item.quantity,
  };
  });

const session = await stripe.checkout.sessions.create({
  line_items: lineItems,
  mode: 'payment',
    success_url: `http://localhost:5178/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'http://localhost:5178/cart',
  });

  res.json({checkout_url: session.url});
});



/* app.get('/order-confirmation?session_id={CHECKOUT_SESSION_ID}', async (req: Request, res: Response) => {

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.json({
    message: "order confirmed!",
    customer_name: customer?.name,
    payement_status: session.payement_status,
    session_id: session.id
  })

}); */
