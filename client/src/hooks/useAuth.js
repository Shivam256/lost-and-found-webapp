import { useCallback } from "react";

//libs
import { useSelector, useDispatch } from "react-redux";

//redux
import {
  loginSuccess,
  initialize,
  logoutSuccess,
  registerSuccess,
} from "../redux/slices/auth";
import { useSnackbar } from "notistack";

import { isValidToken,setSession } from "../utils/jwt";
import {useNavigate} from 'react-router-dom';
import axios from "../utils/axiosInstance";

const useAuth = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const registerClient = useCallback(async (userData) => {
    const response = await axios.post("/auth/signup", userData);
    console.log(response, "i am signup response");
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: "error" });
      return;
    } else {
      const { token, user } = response.data;
      console.log(token, user);
      setSession(token);
      dispatch(registerSuccess({ user }));

    }
  }, []);

  const login = useCallback(async (userData) => {
    const response = await axios.post("/auth/login", userData);
    console.log(response, "i am login response");
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: "error" });
      return;
    } else {
      const { token, user } = response.data;
      setSession(token);
      dispatch(loginSuccess({ user }));
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch(logoutSuccess());
    navigate("/");

  }, []);

  const initializeAuth = useCallback(async () => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (isValidToken(accessToken)) {
      setSession(accessToken);
      const response = await axios.get("/auth/jwtVerify");
      console.log(response, "i am initialize response");
      if (response) {
        const { user } = response.data;
        delete user.password;
        dispatch(
          initialize({
            user,
            isLoggedIn: true,
          })
        );
      } else {
        dispatch(
          initialize({
            user: null,
            isLoggedIn: false,
          })
        );
      }
    } else {
      dispatch(
        initialize({
          user: null,
          isLoggedIn: false,
        })
      );
    }
  }, []);

  return {
    registerClient,
    login,
    logout,
    initializeAuth,
    isLoggedIn,
    user,
  };
};

export default useAuth;
