import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoundItemSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    location:{
        name:{
            type:String,
        },
        coordinates:[Number]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    description:{
        type:String,
    },
    images:[{
        type:String
    }],
    founder:{
        type:Schema.Types.ObjectId,
        ref:'USER',
    },
    tags:[{
        type:String
    }],
    claims:[{
        type:Schema.Types.ObjectId,
        ref:'CLAIM'
    }],
    isComplete:{
        type:Boolean,
        default:false
    }
});


const FoundItem = mongoose.model('ITEM',FoundItemSchema);

export default FoundItem;