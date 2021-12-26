const express= require('express');
const Rest =require('../models/rest');
const router =express.Router();

//INDEX
router.get("/", async(req,res) => {
	console.log(req.user);
	try{
		const rests = await Rest.find().exec();
		res.render("company",{company:rests});
	}
	catch(err){
		console.log(err);
		res.send("you broki it .../index");
	}	
});

// Create

router.post("/", async(req,res) => {
	console.log(req.body);
	const genre =req.body.genre.toLowerCase();
	const newRest= {
		title: req.body.title,
		description: req.body.total,
		owner: req.body.target,
		parent: {
			type: req.rest._id,
		}
	}
	try{
		const rest = await Rest.create(newRest)	;
		console.log(rest)
		res.redirect("/company/"+rest.id);
	}
	catch(err){
		console.log(err);
		rest.redirect("/company");
	}
	// restaurant.push(req.body)
	
});


// NEW route to be ID route otherwise it will shown never 
router.get("/new",(req,res)=>{
	res.render("company_new");	
});


//Edit

router.get("/:id/edit",checkRestAuthor, async (req,res)=> {
	
	const rest= await Rest.findById(req.params.id).exec();
	res.render("restaurant_edit",{rest});
})

//Update

router.put("/:id", async(req,res) => {
	console.log(req.body);
	const genre =req.body.genre.toLowerCase();
	const rest= {
		title: req.body.title,
		total: req.body.total,
		target: req.body.target,
	}
	try{
		const updatedRest =await Rest.findByIdAndUpdate(req.params.id, rest, {new: true} ).exec();
		console.log(updatedRest);
		res.redirect(`/company/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("You broke it ... /company/:id");
	}	
})


//Delete

router.delete("/:id",checkRestAuthor ,async (req,res) => {
	try{
		const deletedRest = await Rest.findByIdAndDelete(req.params.id).exec()
		console.log("Deleted:",deletedRest);
		res.redirect("/company");
	}catch{
		console.log(err);
		res.send("You broke it ... /company/:id");
	}
})

module.exports=router;