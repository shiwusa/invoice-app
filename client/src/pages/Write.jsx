import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;

  const { currentUser } = useContext(AuthContext);

  const [company, setCompany] = useState(state?.company || "");
  const [amount, setAmount] = useState(state?.amount || "");
  const [description, setDescription] = useState(state?.description || "");
  const [requester, setRequester] = useState(state?.requester || "");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(state?.status || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <p>Permission denied. Please log in to continue.</p>;
  }
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        company,
        amount,
        description,
        requester,
        status,
        file: file ? await upload() : "",
      };

      const requestOptions = {
        method: state ? "PUT" : "POST",
        body: JSON.stringify(
          state
            ? requestData
            : {
                ...requestData,
                date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
              }
        ),
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetch(
        state ? `/invoices/${state.id}` : "/invoices/",
        requestOptions
      );
      navigate("/?status=appr");
    } catch (err) {
      console.log(err);
    }
  };

  const statuses = [
    { value: "appr", label: "Approved" },
    { value: "cancel", label: "Cancel" },
    { value: "hold", label: "Hold" },
    { value: "paid", label: "Paid" },
    { value: "sched", label: "Scheduled" },
    { value: "ent", label: "Entered" },
    { value: "pend", label: "Pending" },
  ];

  const fields = [
    { name: "company", value: company, set: setCompany },
    { name: "amount", value: amount, set: setAmount },
    { name: "description", value: description, set: setDescription },
    { name: "requester", value: requester, set: setRequester },
  ];

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const renderStatusRadioInputs = () => {
    return statuses.map((item) => {
      return (
        <div className="status">
          <input
            type="radio"
            checked={item.value === status}
            name="status"
            value={item.value}
            id={item.value}
            onChange={handleChange}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      );
    });
  };

  return (
    <div className="add">
      <div className="content">
        {fields.map(({ name, value, set }) => (
          <input
            key={name}
            type="text"
            value={value}
            placeholder={`${name[0].toUpperCase()}${name.slice(1)}`}
            onChange={(e) => set(e.target.value)}
          />
        ))}
      </div>
      <div className="menu">
        <div className="item">
          <h1>Status</h1>
          {renderStatusRadioInputs()}
        </div>
        <div className="item">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload file
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Write;
