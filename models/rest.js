const mongoose =require("mongoose");

const restSchema =new mongoose.Schema({
	title:String,
	total: Number,
	target:Number,
	parent: {
		id: {
			type : mongoose.Schema.Types.ObjectId,
			ref : "Rest"
		}
	}
})

module.exports=mongoose.model("rest",restSchema);