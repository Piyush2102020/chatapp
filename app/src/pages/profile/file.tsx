import { useEffect, useState } from 'react';
import './style.css';
import axiosInstance from '../../helpers/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface UserData {
    username: string;
    dp?: string;
    posts: any[];
    nfollower: number;
    nfollowing: number;
    name:string;
    bio:string;
}

export default function Profile() {
    const { username } = useParams();
    const [userData, setData] = useState<UserData | null>(null); 
    const myUsername=useSelector((state:RootState)=>state.userData.username);
    const navigate=useNavigate();
    useEffect(() => {
        console.log(myUsername,username);
        
        if(myUsername==username){
            navigate('/dashboard/profile') 
            return;
        }
        else{
            console.log("Searching profile:", username);

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(username ? `/account/${username}` : `/account`);
                setData(response.data.data);
                console.log(userData);
                
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();


        }
        
    }, [username]);

    if (!userData) return <p>Loading...</p>; 

    return (
        <div className='profile-page'>
            <div className='profile-first-section'>
                <img className='post-profile-pic'
                    src={userData.dp ? userData.dp : '/icons/user-image-with-black-background.png'}
                    alt="User Avatar"
                />
                <div className='user-info'>
                    <h1>{userData.username}</h1>
                    <h2>{userData.name}</h2>
                    <div className='meta'>
                        <div className='meta-icon'><span>{userData.posts.length}</span><strong> Posts</strong></div>
                        <div className='meta-icon'><span>{userData.nfollower}</span> Followers</div>
                        <div className='meta-icon'><span>{userData.nfollowing}</span> Following</div>
                    </div>
                </div>
            </div>

            <div className='profile-second-section'>
                {userData.bio}
                <div className='profile-button-holder'>

                    <button className='profile'>Follow</button>
                    <button className='profile message'>Message</button>
                </div>
            </div>
        </div>
    );
}
