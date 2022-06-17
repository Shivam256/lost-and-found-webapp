import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import useItems from "../../hooks/useItems";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import CustomButton from "../../components/customButton/customButton.component";

const AllClaims = () => {
  const { itemId } = useParams();
  const [claims, setClaims] = useState([]);

  const { getAllClaimsOnItem, acceptClaim, rejectClaim } = useItems();

  useEffect(() => {
    console.log(itemId);
    if (itemId) {
      getAllClaimsOnItem(itemId).then((res) => {
        setClaims(res);
      });
    }
  }, [itemId]);

  return (
    <div className="w-full flex flex-col pb-36">
      <h1 className="text-2xl font-semibold mb-3 text-[#2F2E41]">
        All claims on
      </h1>

      <h1 className="text-3xl font-bold text-[#2F2E41]">
        {claims[0]?.item.title}
      </h1>
      <h1 className="text-2xl font-bold text-[#2F2E41] mt-8">
        {claims?.length} claims
      </h1>
      {claims
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
              <Avatar src={claim?.claimer?.profileImage} />
              <Typography>
                <span className="text-lg font-semibold text-[#2F2E41]">
                  {" "}
                  {claim?.claimer?.name}{" "}
                </span>
                <br />{" "}
                <span className="text-[#979797]">{claim?.claimer?.email}</span>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <h1 className="text-sm mb-3 text-[#6C63FF">{claim?.status}</h1>
                <div className="grid grid-cols-3 gap-3">
                  {claim?.proofs.map((proof) => (
                    <img src={proof} className="w-24 h-24 rounded-lg" alt="" />
                  ))}
                </div>
                <div className="flex mt-4 gap-4">
                  <CustomButton
                    sx={{ fontSize: "0.9em" }}
                    onClick={() => {
                      acceptClaim(claim?._id);
                    }}
                  >
                    ACCEPT
                  </CustomButton>
                  <CustomButton
                    sx={{
                      backgroundColor: "#c00b0b",
                      fontSize: "0.9em",
                      "&:hover": { backgroundColor: "#c00b0b" },
                    }}
                    onClick={() => {
                      rejectClaim(claim?._id);
                    }}
                  >
                    REJECT
                  </CustomButton>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<Icon icon="akar-icons:chevron-down" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<Icon icon="akar-icons:chevron-down" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default AllClaims;
