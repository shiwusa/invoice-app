import React from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import {Link} from "react-router-dom";
import Menu from "../components/Menu";
const Invoice = () => {
    return (
        <div className="invoice">
            <div className="content">
                <div className="info">
                    <span>Username</span>
                    <p>Date of creation</p>
                </div>
                <div>
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Leo vel orci porta non pulvinar neque laoreet suspendisse.
                        Amet tellus cras adipiscing enim eu turpis egestas pretium aenean.
                        Porta nibh venenatis cras sed felis. Praesent elementum facilisis
                        leo vel fringilla est ullamcorper. Vel pharetra vel turpis nunc
                        eget lorem. Praesent tristique magna sit amet purus gravida quis.
                        Leo urna molestie at elementum eu. Sed velit dignissim sodales ut
                        eu sem integer vitae. Leo vel fringilla est ullamcorper eget.
                        Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla.
                        Nibh cras pulvinar mattis nunc sed blandit. Diam maecenas
                        ultricies mi eget mauris pharetra et. Vitae ultricies leo
                        integer malesuada nunc vel risus commodo. Tellus at urna
                        condimentum mattis pellentesque id nibh tortor. Vestibulum
                        rhoncus est pellentesque elit ullamcorper dignissim cras
                        tincidunt. Etiam sit amet nisl purus in mollis nunc.
                        Egestas integer eget aliquet nibh praesent tristique magna.
                        Phasellus egestas tellus rutrum tellus pellentesque eu
                        tincidunt tortor aliquam. Duis ut diam quam nulla porttitor
                        massa id neque aliquam.
                    </p>
                </div>
                <div className="edit">
                    <Link to={`/write?edit=2`}>
                        <img src={Edit} alt=""/>
                    </Link>
                    <img src={Delete} alt=""/>
                </div>
            </div>
            <Menu />
        </div>
    )
}

export default Invoice;