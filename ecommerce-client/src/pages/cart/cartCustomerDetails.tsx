import { ChangeEvent, useEffect, useState } from "react"
import { useCustomer } from "../../hooks/useCustomer"
import { NewCartCustomer } from "./createNewCustomerCart";

export const CartCustomerDetails = () => {
    const [customerEmail, setCustomerEmail] = useState("")
    const {customers, fetchCustomersHandler, fetchCustomerByEmailHandler}=useCustomer();
    const [isCustomer, setIsCustomer] = useState<boolean>(true)

    useEffect(() => {
        fetchCustomersHandler();
    }, [])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setCustomerEmail(email)
    }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
        
    const customerFound = await fetchCustomerByEmailHandler(customerEmail)

    if(customerEmail){
        customers.map((c) => {
            if(c.email === customerEmail){
                return c.id;
            }
        })
    }

    if (customerFound) {
        setIsCustomer(true);
        return
        console.log("found customer")
      } else {
        setIsCustomer(false);
      }

    }

    return(
        <>
        <div>
            {isCustomer ? (
        <form onSubmit={handleSubmit}>
        <p>Already a customer:</p>
        <input type="text"
        placeholder="email" 
        value={customerEmail}
        onChange={handleChange}/>
        <button type="submit">Check</button>
        </form>
        ):
        (
            <>
            <NewCartCustomer />
            </>

        )}
        </div>
        
        </>
    )
}