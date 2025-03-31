import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed || []);

  const getFeed = async () => {
    if (Array.isArray(feed) && feed.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      if (res?.data) {
        dispatch(addFeed(res.data));
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, [feed]); 

  if(!feed)return;

  if(feed.length <= 0){
    return <h1 className='flex justify-center items-center font-bold mt-10 text-3xl mb-10'>No new users found</h1>
  }

  return (
    <div className='my-10'>
      {Array.isArray(feed) && feed.length > 0 && <UserCard data={feed[0]} btnshow={true} />}
    </div>
  );
};

export default Feed;
