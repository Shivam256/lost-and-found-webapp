import React from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const FoundItemOverview = ({item}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-72 shadow-lg my-5 flex flex-col rounded-lg overflow-hidden"
      onClick={() => {
        navigate(`/foundItems/${item?._id}`);
      }}
    >
      {/* <div className="w-full h-3/4 bg-[url(`https://n3.sdlcdn.com/imgs/j/x/s/Boat-Rockerz-450-Pro-On-SDL985542287-1-40046.jpg`)]"></div>
       */}
      <img
        src={item?.images[0]}
        alt=""
        className="full h-2/3 object-cover"
      />
      <div className="w-full p-2 h-1/5">
        <h1 className="text-2xl text-[#2F2E41] font-medium">{item.title}</h1>
        <h3 className="text-md text-[#979797]">
          Found on {moment(item?.date).format('h:mma')} at {moment(item?.date).format('MMMM d,YYYY')}
        </h3>
        <h4 className="text-xs text-[#979797]">{item?.claims.length} claims uptil now!</h4>
      </div>
    </div>
  );
};

export default FoundItemOverview;
