import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";

const Home = () => {
    const [invoices, setInvoices] = useState([]);

    const status = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/invoices${status}`);
                setInvoices(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [status]);

    return (
        <div className="home">
            <div className="invoices">
                {invoices.map((invoice) => (
                    <div className="invoice" key={invoice.id}>
                        <div className="content">
                            <Link className="link" to={`/invoice/${invoice.id}`}>
                                <h1>{invoice.company}</h1>
                            </Link>
                            <p>{invoice.desc}</p>
                            <button>More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;