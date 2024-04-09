import React, { useState } from 'react';

const Inquiry = () => {
    const [contactInfo, setContactInfo] = useState({
        ename: "",
        email: "",
        remarks: ""
    });

    const onChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.id]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(contactInfo);
        let { ename, email, remarks } = contactInfo;

        try {
            let result = await fetch(
                'http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify({ ename, email, remarks }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);
            if (result) {
                alert("Data saved successfully");
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            alert('Failed to submit form. Please try again later.');
        }
    }

    return (
        <form className="mt-2" onSubmit={handleOnSubmit}>
            <div className="form-group">
                <label htmlFor="name"> Name </label>
                <input id="ename" type="text"
                    placeholder="Name"
                    value={contactInfo.ename}
                    onChange={onChange}
                    className="form-control"
                    name="name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email"> Email </label>
                <input id="email" type="email"
                    value={contactInfo.email}
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="remarks"> Remarks </label>
                <input id="remarks" type="text"
                    value={contactInfo.remarks}
                    className="form-control"
                    placeholder="Remarks"
                    name="remarks"
                    onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary mt-2"
                disabled={!contactInfo.ename || !contactInfo.email}
            >
                Submit
            </button>
        </form>
    );
};

export default Inquiry;
