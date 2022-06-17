import User from "../models/user.models.js";
import FoundItem from "../models/foundItem.model.js";
import Claim from "../models/claim.model.js";

export const getUserItems = async (req, res) => {
  try {
    const items = await FoundItem.find({ founder: req.user._id });
    return res
      .status(200)
      .send({ ok: true, message: "items fetched successfully", items });
  } catch (err) {
    console.log(err);
  }
};

export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimer: req.user._id })
      .populate("item")
      .populate("founder").populate('claimer');
    return res
      .status(200)
      .send({ ok: true, message: "user claim fetched", claims });
  } catch (err) {
    console.log(err);
  }
};
