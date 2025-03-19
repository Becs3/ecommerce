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
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: 'Rikards Tårta',
          },
          unit_amount: 5 * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:5173/checkout',
    client_reference_id: '123'
  });


  res.json({checkout_url: session.url});
});