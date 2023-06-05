const mongoose = require('mongoose');
const{ObjectId} = mongoose.Schema;
// make table 

const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "title is required"],

        },
        content:{
            type:String,
            required :[true,"Content is required"]
        },
        postedBy:{
            type:ObjectId,
            ref:"User",
        },
        image:{
            url:String,
            public_id: String,
        },
        like: [{type: ObjectId , ref: "User"}],
        comments:[
            {
                text:String,
                created: {type: Date, default :Date.now},
                postedBy:{
                    type:ObjectId,
                    ref:"User"
                },
            },
        ],

    },
    {timestamps:true}
);
module.exports = mongoose.model("Post", postSchema);