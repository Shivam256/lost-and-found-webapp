import React, { useState, useEffect } from "react";
import CustomButton from "../../components/customButton/customButton.component";
import { Drawer, styled } from "@mui/material";
import useItems from "../../hooks/useItems";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";
import {useSnackbar} from 'notistack';

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2hpdmFtMjU2IiwiYSI6ImNrb3N1MnJnZDA0emoycHJ4anBoNWJ4NjQifQ.mObap8E6MFXkAta7s4MMOw",
});

const DrawerContainer = styled("div")(() => ({
  width: "100%",
  height: "fit-content",
  borderRadius: "30",
  backgroundColor: "white",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const CustomDrawer = styled(Drawer)(() => ({
  width: "100%",
  height: "fit-content",
  "& .MuiPaper-root.MuiDrawer-paper": {
    borderRadius: "20px 20px 0px 0px",
  },
}));

const FoundItemDescription = () => {
  const [showClaimDrawer, setShowClaimDrawer] = useState(false);
  const [item, setItem] = useState(null);
  const [proofs, setProofs] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const { getFoundItem, claimFoundItem } = useItems();
  const {enqueueSnackbar} = useSnackbar();

  const fileHandler = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // setData({ ...data, thumbnail: result.info.url });
          console.log(result.info.url);
          setProofs((proofs) => [...proofs, result.info.url]);
        }
      }
    );
    widget.open();
  };

  const handleClaim = () => {
    console.log(proofs);
    const data = {
      proofs,
      founderId: item?.founder,
    };
    if(proofs.length === 0){
      enqueueSnackbar('Please add proofs',{variant:'error'})
      return;
    }
    console.log(data);
    claimFoundItem(data, item?._id);
  };

  const toggleDrawer = () => {
    setShowClaimDrawer(!showClaimDrawer);
  };
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getFoundItem(id).then((res) => {
        setItem(res);
      });
    }
    // console.log(id);
  }, [id]);

  return (
    <div className="w-full flex flex-col pb-5 p-2 px-5">
      <div className="w-full mb-8 mt-5">
        <Slider {...settings}>
          {item?.images.map((i) => (
            <div>
              <img
                src={i}
                alt=""
                className="w-full h-64 object-cover rounded-lg min-h-64"
              />
            </div>
          ))}
        </Slider>
        {/* <img src={item?.images[0]} alt="" className="full h-2/3 object-cover" /> */}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium text-[#2F2E41]">{item?.title}</h1>
        <h3 className="text-lg text-[#979797]">
          Found on {moment(item?.date).format("h:mma")} at{" "}
          {moment(item?.date).format("MMMM d,YYYY")}
        </h3>
        <h3 className="text-md text-[#979797] font-light">
          {item?.description}
        </h3>
      </div>
      <div className="w-full mt-5 mb-8">
        <h1 className="text-2xl font-medium text-[#2F2E41]">Location:</h1>
        <h1 className="text-xl mt-2 mb-3">{item?.location.name}</h1>
        {item !== null ? (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "30vh",
              width: "90vw",
            }}
            center={[
              item?.location.coordinates[1],
              item?.location?.coordinates[0],
            ]}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature
                coordinates={[
                  item?.location.coordinates[1],
                  item?.location?.coordinates[0],
                ]}
              />
              {/* <Popup
                coordinates={[
                  item?.location.coordinates[1],
                  item?.location?.coordinates[0],
                ]}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38],
                }}
              >
                <h1>Popup</h1>
              </Popup> */}
              {/* <Marker
                coordinates={[
                  item?.location.coordinates[1],
                  item?.location?.coordinates[0],
                ]}
                anchor="bottom"
              >
                <img src="https://www.clipartmax.com/png/middle/114-1148777_pin-map-pushpin-location-icon-location-pin-icon-transparent.png" />
              </Marker> */}
            </Layer>
          </Map>
        ) : null}
      </div>
      <div className="w-full flex flex-col items-center">
        <CustomButton onClick={toggleDrawer}>CLAIM</CustomButton>
      </div>
      {/* <CustomDrawer> */}
      <CustomDrawer
        open={showClaimDrawer}
        onClose={toggleDrawer}
        anchor="bottom"
        sx={{ "&.MuiPaper-root ": { borderRadius: "20px 20px 0px 0px" } }}
      >
        <DrawerContainer>
          <h1 className="text-3xl font-medium text-[#2F2E41]">
            Claim your item
          </h1>
          <h3 className="text-md text-[#979797] font-light">
            To avoid handling of an object to any malicious user we require a
            proof of ownership for you to make a successfull claim to this
            object.
          </h3>
          <h3 className="text-md text-[#979797] font-light mt-2">
            A proff of claim can be anything that verifies you as a owner of
            this object Eg: Password of a phone, mobile number in phone. photo
            fo you using the object etc
          </h3>
          <div className="mb-5">
            <h1 className="text-2xl font-medium text-[#2F2E41] mt-5 mb-2">
              Add your proofs
            </h1>
            <Icon
              onClick={fileHandler}
              icon="entypo:images"
              width="40px"
              height="40px"
              color="#6C63FF  "
            />
          </div>

          <CustomButton onClick={handleClaim}>CLAIM</CustomButton>
        </DrawerContainer>
      </CustomDrawer>
      {/* </CustomDrawer> */}
    </div>
  );
};

export default FoundItemDescription;
