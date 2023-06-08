import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const status = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/invoices`;
        if (status) {
          url = `${url}${status}&page=${page}`;
        } else {
          url = `${url}?page=${page}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setInvoices(data);
        setTotalPages(parseInt(res.headers.get("x-total-pages")));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [status, page]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <div className="home">
      <div className="invoices">
        {invoices.map((invoice) => (
          <div className="invoice" key={invoice.id}>
            <div className="content">
              <h1>{invoice.company}</h1>
              <p>Amount: {invoice.amount} ₴</p>
              <p>Status: {invoice.status}</p>
              <Link className="link" to={`/invoice/${invoice.id}`}>
                <button>More</button>
              </Link>
            </div>
          </div>
        ))}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            &#60;
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
