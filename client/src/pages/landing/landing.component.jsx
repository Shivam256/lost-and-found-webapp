import React from "react";
import landingPageImage from "../../assets/images/landingPageImage.png";
import CustomButton from "../../components/customButton/customButton.component";
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-12 p-4">
      <img src={landingPageImage} alt="" srcset="" />
      <div className="flex w-full flex-col items-center">
        <h1 className="text-3xl font-bold text-[#2E3E5C]" >Lost&Found</h1>
        <h1 className="text-lg text-center text-[#9FA5C0]" >Find something you lost or help someone who lost somthing</h1>
      </div>
      <CustomButton onClick={()=>{navigate('/signup')}} >GET STARTED</CustomButton>
    </div>
  );
};

export default LandingPage;
