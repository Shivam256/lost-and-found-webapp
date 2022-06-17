import { useCallback } from "react";

//libs
import { useSelector, useDispatch } from "react-redux";

//redux
// import {
//   loginSuccess,
//   initialize,
//   logoutSuccess,
//   registerSuccess,
// } from "../redux/slices/auth";
import { useSnackbar } from "notistack";
import { getFoundItemsSuccess } from "../redux/slices/items";

import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const useItems = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { foundItems } = useSelector((state) => state.item);

  const postFoundItem = useCallback(async (data) => {
    const response = await axios.post("/foundItem", data);
    if (!response.data.ok) {
      enqueueSnackbar(response.data.message, { variant: "error" });
      return;
    } else {
      enqueueSnackbar("Items posted successfully!", { variant: "success" });
      navigate(`/foundItem/${response.data.foundItem?._id}`);
    }
  }, []);

  const getAllFoundItems = useCallback(async () => {
    const response = await axios.get("foundItem");
    console.log(response);
    if (response.data.ok) {
      dispatch(getFoundItemsSuccess(response.data.items));
    } else {
      enqueueSnackbar("Error fetching items", { variant: "error" });
    }
  }, []);

  const getFoundItem = useCallback(async (id) => {
    const response = await axios.get(`/foundItem/${id}`);
    if (response.data.ok) {
      console.log(response);
      return response.data.item;
    } else {
      enqueueSnackbar("Error fetching item", { variant: "error" });
    }
  }, []);

  const claimFoundItem = useCallback(async (data, itemId) => {
    const response = await axios.post(`/foundItem/claim/${itemId}`, data);
    if (response.data.ok) {
      console.log(response);
      enqueueSnackbar("Claim successfull", { variant: "success" });
      navigate("/foundItems");
    } else {
      enqueueSnackbar("Error fetching item", { variant: "error" });
    }
  }, []);

  const getUserFoundItems = useCallback(async () => {
    const response = await axios.get("/user/myFoundItems");
    if (response.data.ok) {
      console.log(response);
      return response.data.items;
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, []);

  const getAllClaimsOnItem = useCallback(async (itemId) => {
    const response = await axios.get(`/foundItem/claim/${itemId}`);
    if (response.data.ok) {
      console.log(response);
      return response.data.claims;
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, []);

  const acceptClaim = useCallback(async (claimId) => {
    const response = await axios.get(`/founditem/acceptClaim/${claimId}`);
    if (response.data.ok) {
      enqueueSnackbar("Claim accepted successfully!", { variant: "success" });
      navigate(`/profile`);

    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, []);
  const rejectClaim = useCallback(async (claimId) => {
    const response = await axios.get(`/founditem/rejectClaim/${claimId}`);
    if (response.data.ok) {
      enqueueSnackbar("Claim rejected successfully!", { variant: "success" });
      navigate(`/profile`);

    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, []);

  const getUserClaims = useCallback(async () => {
    const response = await axios.get("/user/claims");
    if (response.data.ok) {
      console.log(response);
      return response.data.claims;
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, []);

  return {
    postFoundItem,
    getAllFoundItems,
    foundItems,
    getFoundItem,
    claimFoundItem,
    getUserFoundItems,
    getAllClaimsOnItem,
    acceptClaim,
    rejectClaim,
    getUserClaims,
  };
};

export default useItems;
