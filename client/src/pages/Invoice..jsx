import React, {useContext, useEffect, useState} from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import { formatDistanceToNow } from "date-fns";
import {AuthContext} from "../context/authContext";

const Invoice = () => {
    const [invoice, setInvoice] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const invoiceId = location.pathname.split("/")[2];

    const date = invoice.date
        ? formatDistanceToNow(new Date(invoice.date))
        : "";

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/invoices/${invoiceId}`);
                const data = await res.json();
                setInvoice(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [invoiceId]);

    const handleDelete = async () => {
        try {
            await fetch(`/invoices/${invoiceId}`, {
                method: "DELETE",
            });
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
                    <p>Created {date} ago</p>
                </div>
                <div className="details">
                    <h1>Company: {invoice.company}</h1>
                    <p>Description: {invoice.desc}</p>
                    <p>Amount: {invoice.amount} ₴</p>
                    <p>Requester: {invoice.requester}</p>
                    <p>Status: {invoice.status}</p>
                    {currentUser && invoice.file && (
                        <Link  download={invoice.file}>
                            Download file
                        </Link>
                        )}
                </div>
                {currentUser?.username === invoice.username && (
                    <div className="edit">
                    <Link to={`/write?edit=2`} state={invoice}>
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