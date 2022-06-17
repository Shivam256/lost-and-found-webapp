import { Avatar, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useItems from "../../hooks/useItems";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";

const Profile = () => {
  const { getUserFoundItems, getUserClaims } = useItems();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userClaims, setUserClaims] = useState([]);

  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    getUserFoundItems().then((res) => {
      setUserItems(res);
    });
    getUserClaims().then((res) => {
      setUserClaims(res);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center mb-24 mt-24">
      <div className="flex flex-col items-center gap-1">
        <Avatar sx={{ width: "200px", height: "200px" }} />
        <h1 className="font-semibold text-2xl text-[#2F2E41] mt-3">
          {user?.name}
        </h1>
        <h1 className="text-[#979797] ">{user?.email}</h1>
      </div>
      <div className="w-full mt-8">
        <h1 className="text-2xl font-semibold mb-3">Items I found ..</h1>
        <div className="w-full grid grid-cols-2 gap-5">
          {userItems
            .slice()
            .reverse()
            .map((item) => (
              <div
                className="w-full"
                onClick={() => {
                  if (!item?.isComplete) {
                    navigate(`/allClaims/${item?._id}`);
                  }
                }}
              >
                <img
                  src={item?.images[0]}
                  className="w-full h-40 rounded-lg object-cover"
                  alt=""
                />
                <div>{item?.claims.length} claims</div>
                <div className="font-semibold text-lg text-green-500">
                  {item?.isComplete ? "CLAIMED" : ""}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full mt-8">
        <h1 className="text-2xl font-semibold mb-3">My claims</h1>
        <div>
          {userClaims
            .slice()
            .reverse()
            .map((claim, index) => (
              <Accordion
                sx={{
                  "& .MuiAccordionSummary-content": {
                    display: "felx",
                    alignItems: "center",
                    gap: "20px",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<Icon icon="akar-icons:chevron-down" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <img
                    src={claim?.item?.images[0]}
                    className="h-12 w-12 object-cover rounded-lg"
                    alt=""
                  />
                  <Typography>
                    <span className="text-lg font-semibold text-[#2F2E41]">
                      {" "}
                      {claim?.item?.title}{" "}
                    </span>
                    <br />{" "}
                    <span className="text-[#979797]">{claim?.status}</span>{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <div className="grid grid-cols-3 gap-3">
                      {claim?.proofs.map((proof) => (
                        <img
                          src={proof}
                          className="w-24 h-24 rounded-lg"
                          alt=""
                        />
                      ))}
                    </div>
                    <div>
                      {claim?.status === "accepted" ? (
                        <div className="flex mt-3 gap-3 items-center border border-black p-2 rounded-lg">
                          <Avatar src={claim?.founder?.profileImage} />
                          <div>
                            <h1>Name: {claim?.founder?.name}</h1>
                            <h1>Email: {claim?.founder?.email}</h1>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
