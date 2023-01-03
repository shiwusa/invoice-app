import React, {useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;

    const [company, setCompany] = useState(state?.company || "");
    const [amount, setAmount] = useState(state?.amount || "");
    const [desc, setDesc] = useState(state?.desc || "");
    const [requester, setRequester] = useState(state?.requester || "");
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(state?.status || "");

    const navigate = useNavigate();
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileUrl = await upload();
        try {
            state ? await axios.put(`/invoices/${state.id}`, {
                company,
                amount,
                desc,
                requester,
                status,
                file: file ? fileUrl : "",
            }) :
                await axios.post(`/invoices/`, {
                    company,
                    amount,
                    desc,
                    requester,
                    status,
                    file: file ? fileUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="add">
            <div className="content">
                <input type="text" value={company} placeholder="Company name" onChange={e=>setCompany(e.target.value)}/>
                <input type="number" value={amount} placeholder="Amount" onChange={e=>setAmount(e.target.value)}/>
                <input type="text" value={desc}  placeholder="Description" onChange={e=>setDesc(e.target.value)}/>
                <input type="text" value={requester} placeholder="Requester" onChange={e=>setRequester(e.target.value)}/>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Status</h1>
                    <div className="status">
                        <input type="radio" checked={status === "appr"} name="status" value="appr" id="appr" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="appr">Approved</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "cancel"} name="status" value="cancel" id="cancel" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="cancel">Cancel</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "hold"} name="status" value="hold" id="hold" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="hold">Hold</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "paid"} name="status" value="paid" id="paid" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="paid">Paid</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "sched"} name="status" value="sched" id="sched" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="sched">Scheduled</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "ent"} name="status" value="ent" id="ent" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="ent">Entered</label>
                    </div>

                    <div className="status">
                        <input type="radio" checked={status === "pend"} name="status" value="pend" id="pend" onChange={e=>setStatus(e.target.value)}/>
                        <label htmlFor="pend">Pending</label>
                    </div>
                </div>
                <div className="item">
                    <input style={{display:"none"}} type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload file</label>
                    <button onClick={handleSubmit} >Submit</button>

                </div>
            </div>
        </div>
    )
}

export default Write;