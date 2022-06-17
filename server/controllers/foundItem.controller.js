import FoundItem from "../models/foundItem.model.js";
import Claim from "../models/claim.model.js";
import User from "../models/user.models.js";

export const postFoundItem = async (req, res) => {
  const { title, location, description, images, tags } = req.body;

  if (!title || !images) {
    return res
      .status(200)
      .send({ ok: false, message: "Please fill all the required fields!" });
  }

  const foundItem = new FoundItem({
    title,
    location,
    description,
    images,
    founder: req.user._id,
    tags,
  });

  await foundItem.save();

  return res
    .status(200)
    .send({ ok: true, message: "Item successfully posted!", foundItem });
};

export const getAllFoundItems = async (req, res) => {
  const items = await FoundItem.find({});
  return res
    .status(200)
    .send({ ok: true, message: "Items successfully fetched from db", items });
};

export const getOneFoundItem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(200).send({ ok: false, message: "id cannot be null" });
  }

  const item = await FoundItem.findById(id);

  if (item) {
    return res
      .status(200)
      .send({ ok: true, message: "Item successfully found", item });
  }
  return res.send(200).send({ ok: false, message: "Item not found!" });
};

export const claimFoundItem = async (req, res) => {
  const { proofs, founderId } = req.body;
  const { itemId } = req.params;
  try {
    const item = await FoundItem.findById(itemId);

    const claim = new Claim({
      founder: founderId,
      item: itemId,
      claimer: req.user._id,
      proofs: proofs,
    });

    await claim.save();

    const newClaims = [...item.claims, claim];
    item.claims = [...newClaims];
    await item.save();

    return res
      .status(200)
      .send({ ok: true, message: "Claim successfull!", claim });
  } catch (err) {
    console.log(err);
  }
};

export const getClaimsOnItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const claims = await Claim.find({ item: itemId })
      .populate("item")
      .populate("claimer");
    return res
      .status(200)
      .send({ ok: true, message: "Claims fetched successfully", claims });
  } catch (err) {
    console.log(err);
  }
};

export const acceptClaim = async (req, res) => {
  try {
    const { claimId } = req.params;
    const claim = await Claim.findById(claimId);
    (claim.status = "accepted"), await claim.save();

    const item = await FoundItem.findById(claim.item);
    item.isComplete = true;
    await item.save();

    return res
      .status(200)
      .send({ ok: true, message: "claim accepted successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const rejectClaim = async (req, res) => {
  try {
    const { claimId } = req.params;
    const claim = await Claim.findById(claimId);
    (claim.status = "rejected"), await claim.save();
    return res
      .status(200)
      .send({ ok: true, message: "claim rejected successfully" });
  } catch (err) {
    console.log(err);
  }
};


