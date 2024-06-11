import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewPost() {
    const { postId } = useParams();
    const [post, setPost] = useState({ name: '', company: '', expiry_date: '' });

    // Access user object from Redux store
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        // Include Authorization header with user's token
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching medicine:', error);
        });
    }, [postId, user.token]); // Include user.token in the dependency array

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header"><h3>{post.name}</h3></div>
                            <div className="card-body">
                                <p><strong>Company:</strong> {post.company}</p>
                                <p><strong>Expiry Date:</strong> {post.expiry_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewPost);
