const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    short_id : {
        type : String,
        unique : true,
        required : true
    },
    redirect_url : {
        type : String,
        required : true
    },
    visit_history : {
        type : [ { timestamp : { type : Number } } ]
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, 
{ 
    timestamps : true
}
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;