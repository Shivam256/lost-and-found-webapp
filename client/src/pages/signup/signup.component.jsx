import React, { useState,useEffect } from "react";
import logo from "../../assets/images/logo.png";
import CustomButton from "../../components/customButton/customButton.component";
import CustomTextField from "../../components/customTextField/customTextField.component";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { registerClient, isLoggedIn } = useAuth();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/foundItems");
    }
  }, [isLoggedIn]);

  const handleSubmit = () => {
    console.log(data);
    if (data.password !== data.cpassword) {
      enqueueSnackbar("Passwords must match", { variant: "error" });
      return;
    }
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    registerClient(newData);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-12 p-4">
      <img src={logo} alt="" srcset="" />
      <div className="flex w-full flex-col items-center">
        <h1 className="text-3xl font-bold text-[#2E3E5C]">
          Welcome to Lost&Found
        </h1>
        <h1 className="text-lg text-center text-[#9FA5C0]">
          Please nter your details here
        </h1>
      </div>
      <div className="w-full flex flex-col gap-5">
        <CustomTextField
          label="Name"
          name="name"
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="Email or phone number"
          name="email"
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="Password"
          name="password"
          onChange={handleChange}
          fullWidth
        />
        <CustomTextField
          label="Confirm password"
          name="cpassword"
          onChange={handleChange}
          fullWidth
        />
      </div>
      <CustomButton onClick={handleSubmit}>SIGN UP</CustomButton>
      <div className="flex">
        <div>Already havve an account?</div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
