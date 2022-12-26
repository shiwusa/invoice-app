import React from "react";

const Write = () => {
    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="field1"/>
                <input type="text" placeholder="field2"/>
                <input type="number" placeholder="field3"/>
                <input type="text" placeholder="field4"/>
            </div>
            <div className="menu">

                <div className="item">
                    <h1>Status</h1>
                    <div className="status">
                        <input type="radio" name="status" value="Approved" id="appr"/>
                        <label htmlFor="appr">Approved</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Cancel" id="cancel"/>
                        <label htmlFor="cancel">Cancel</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Hold" id="hold"/>
                        <label htmlFor="hold">Hold</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Paid" id="paid"/>
                        <label htmlFor="paid">Paid</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Scheduled" id="sched"/>
                        <label htmlFor="sched">Scheduled</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Entered" id="ent"/>
                        <label htmlFor="ent">Entered</label>
                    </div>

                    <div className="status">
                        <input type="radio" name="status" value="Pending" id="pend"/>
                        <label htmlFor="pend">Pending</label>
                    </div>
                </div>
                <div className="item">
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label className="file" htmlFor="file">Upload file</label>
                    <button>Submit</button>

                </div>
            </div>
        </div>
    )
}

export default Write;