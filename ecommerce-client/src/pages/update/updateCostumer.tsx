import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ICustomer } from "../../models/costumer";
import { useCustomer } from "../../hooks/useCustomer";

export const UpdateCustomerPage = () => {
    
        const [customer, setCustomer] = useState<ICustomer>()
        const {isLoading, error, fetchCustomerByIdHandler, updateCustomerHandler } = useCustomer();
        const params = useParams();
        const navigate = useNavigate();
    
        useEffect(()=> {
            if(!params.id) return;
            fetchCustomerByIdHandler(+params.id).then((data) => setCustomer(data))
        }, [])
    
        const handleChange =(e:FormEvent<HTMLInputElement>) => {
            if(!customer) return;
            setCustomer({...customer, phone: e.currentTarget.value})
    
        }
    
        const handleSubmit = async (e:FormEvent) => {
            e.preventDefault();
    
            if(!customer) return;
    
            await updateCustomerHandler(customer.id, {...customer, phone: customer.phone});
            navigate("/admin/customers")
        
        }
    
        if (isLoading) return <p>Loading..</p>
        if (error) return <p>{error}</p>
    
        return(
            <>
            
            <div className="object-container">
            <p>Customer name: {customer?.firstname}</p>
            <form onSubmit={handleSubmit}>
                <input type="string"
                placeholder="new phonenumber"
                value={customer?.phone} 
                onChange={handleChange}
                />
                <button type="submit">Update phonenumber</button>
            </form>
            <Link to="/admin/customers">Back to customers</Link>
            </div>
            </>
        )
    }