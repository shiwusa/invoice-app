import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Menu = ({status}) => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/invoices/?status=${status}`);
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
            <div className="menu-container">
                {invoices.map(invoice => (
                    <div className="invoices" key={invoice.id}>
                        <h2>{invoice.company}</h2>
                        <Link className="link" to={`/invoice/${invoice.id}`}>
                            <button>View</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menu;