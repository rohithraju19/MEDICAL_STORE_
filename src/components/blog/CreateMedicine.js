import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function CreateMedicine() {
    const [name, setName] = useState('');
    const [company, setCompanyName] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    function addMedicine(event) {
        event.preventDefault(); // Prevent default form submission behavior
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiry_date
        }, {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            navigate('/blog/posts');
        }).catch(error => {
            console.error('Error adding medicine:', error);
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add Medicine</h1>
                        <form onSubmit={addMedicine}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={name} 
                                    onChange={(event)=>{setName(event.target.value)}}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Name:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={company} 
                                    onChange={(event)=>{setCompanyName(event.target.value)}}
                                />
                            </div>
                            <div className="form-group">
                                <label>Expiry Date:</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    value={expiry_date} 
                                    onChange={(event)=>{setExpiryDate(event.target.value)}}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(CreateMedicine);
