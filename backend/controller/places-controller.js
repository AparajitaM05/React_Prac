const { v4: uuidv4 } = require('uuid')
const Place = require('../models/place')
const User = require('../models/user')
const mongoose = require('mongoose')


const HttpError = require('../models/http-error');


const getPlaceById = async (req,res,next)=>{
    const placeId = req.params.pid;
    let place;
    try{
         place = await Place.findById(placeId)

    }
    catch(err){
        const error = new HttpError("Something went wrong could not find a place", 500)
        return next(error)
    }
    

    if(!place){
       const error = new HttpError('Could not find a place for the provided id',404)
       return next(error)
    }

    res.json({
        place: place.toObject({getters:true})
    })

}

const getPlacesByUserId = async(req, res, next)=>{
    const userId = req.params.uid
    let places;
    try{
         places = await Place.find({creator:userId})

    }catch(err){
        const error =  new HttpError("Cound find place by this user id", 500)
        return next(error)
    }
    
    if(!places || places.length===0){
        return next(Error('Could not find a places for the provided user id',404))
    }
    res.json({
       places: places.map(p=>p.toObject({getters:true}))
    })
}

const createPlace = async (req,res,next)=>{
    const {title, description, address,coordinates, creator} = req.body
  

    const createdPlace= new Place({
        id: uuidv4(),
        title,
        description,
        address,
        location: coordinates,
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Empire_State_Building_%28aerial_view%29.jpg',
        creator


    })
    console.log("📌 Created Place (Before Save):", createdPlace);

    let user;

    try{
        user = await User.findById(creator)
        console.log("👤 User Found:", user);

    }catch(err){
       
        const error = new HttpError("Could not find user", 500)
        return next(error)
    }

    try{
        console.log("🚀 Starting Mongoose Session...");

        const sess = await mongoose.startSession();
        console.log("✅ Mongoose Session Started Successfully!");
        sess.startTransaction();
        console.log("🔹 Transaction Started!");

        await createdPlace.save({session: sess});
        console.log("✅ Saved Created Place:", createdPlace);


        console.log("🔹 Places Before Push:", user.places);
        user.places.push(createdPlace._id);
        console.log("✅ Places After Push:", user.places);
        
        console.log("🛠 Saving User...");
        await user.save({ session: sess });
        console.log("✅ User Saved!");

        await sess.commitTransaction()
       console.log("✅ Transaction Committed!");

    }
    catch(err){
        const error = new HttpError("Something went wrong in session", 500)
        return next(error)

    }
   
    
    res.status(201).json({place:createdPlace})


}

const updatePlaceById = async(req,res,next) =>{
    const {title, description} = req.body
    const placeId = req.params.pid;
    let place;
    try{
        place =  await Place.findById(placeId)
    }catch(err){
        const error = new HttpError("Can't find the place", 500)
        return next(error)
    }
    place.title = title
    place.description = description

    try{
        await place.save()
    }catch(err){
        const error = new HttpError("Something went wrong, could not update the place", 500)
        return next(error)
    }


    res.status(200).json({
        place: place.toObject({getters:true})

    })



}

const deletePlaceById = async(req,res,next)=>{

    const placeId = req.params.pid;

   let place;
   try{
    place = await Place.findById(placeId).populate('creator')
   }catch(err){
    const error = new HttpError('something went wrong',500)
    return next(error)
   }
   if(!place){
    const error = HttpError('Could not find the place by this id', 404)
    return next(error)
   }

   try{
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({session: sess})
    place.creator.places.pull(place)
    await place.creator.save({session: sess})
    await sess.commitTransaction()
   }
   catch(err){
    const error = new HttpError('Something went wrong', 500)
    return next(error)
   }


    res.status(200).json({
        message: "Your place has been successfully deleted"
    })


}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlaceById = deletePlaceById;
exports.updatePlaceById= updatePlaceById