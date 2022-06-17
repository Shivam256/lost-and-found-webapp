import mongoose from "mongoose";

const Schema = mongoose.Schema;


const ClaimSchema = new Schema({
    founder:{
        type:Schema.Types.ObjectId,
        ref:'USER',
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:'ITEM',
    },
    claimer:{
        type:Schema.Types.ObjectId,
        ref:'USER',
    },
    proofs:[
        {
            type:String,
        }
    ],
    status:{
        type:String,
        default:'pending',
    }
})


const Claim = mongoose.model('CLAIM',ClaimSchema);


export default Claim;