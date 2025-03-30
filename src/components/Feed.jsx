import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './userCard'



const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed || []);
  console.log(feed);
 

  const getFeed = async () => {
    if(feed.length > 0)return;
    try{
      const res = await axios.get(BASE_URL + "/feed" , {withCredentials : true})
      
      dispatch(addFeed(res?.data));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  } , [])

  return (
    <div>
     {feed && feed.map((feedVal) => <UserCard data={feedVal} />)}

    </div>
  );
}

export default Feed