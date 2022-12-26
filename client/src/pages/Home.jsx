import React from "react";
import {Link} from 'react-router-dom';

const Home = () => {

    const examples = [
       {
         id: 1,
         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
       },
       {
         id: 2,
         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
       },
       {
         id: 3,
         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
       },
       {
         id: 4,
         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
       },
     ];
    return (
        <div className="home">
            <div className="invoices">
                {examples.map((ex) => (
                    <div className="invoice" key={ex.id}>
                        <div className="content">
                            <Link className="link" to={`/invoice/${ex.id}`}>
                                <h1>{ex.title}</h1>
                            </Link>
                            <p>{ex.desc}</p>
                            <button>More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;