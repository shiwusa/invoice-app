import React, {useEffect, useState} from "react";
import axios from "axios";

const Menu = ({status}) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/invoices/?${status}`);
                setInvoices(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [status]);

    return (
        <div className="menu">
            <h1>Also with this status</h1>
            <div className="container">
                {invoices.map(invoice => (
                    <div className="invoice" key={invoice.id}>
                        <h2>{invoice.company}</h2>
                        <button>View</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menu;