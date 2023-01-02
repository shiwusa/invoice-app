import React, {useContext, useEffect, useState} from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";

const Invoice = () => {
    const [invoice, setInvoice] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const invoiceId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/invoices/${invoiceId}`);
                setInvoice(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [invoiceId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/invoices/${invoiceId}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="invoice">
            <div className="content">
                <div className="info">
                    <span>{invoice.username}</span>
                    <p>Created {moment(invoice.date).fromNow()}</p>
                </div>
                <div>
                    <h1>{invoice.company}</h1>
                    <p>
                        {invoice.desc}
                    </p>
                </div>
                {currentUser.username === invoice.username && (
                    <div className="edit">
                    <Link to={`/write?edit=2`}>
                        <img src={Edit} alt=""/>
                    </Link>
                    <img onClick={handleDelete} src={Delete} alt=""/>
                </div>)}
            </div>
            <Menu status={invoice.status}/>
        </div>
    )
}

export default Invoice;