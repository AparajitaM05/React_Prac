const { v4: uuidv4 } = require('uuid')
const User = require('../models/user')

const HttpError = require('../models/http-error');



const userSignUp = async (req,res,next)=>{

    const {name,email,password} = req.body

    let existingUser;
    try{
     existingUser = await User.findOne({email:email})

    }
    catch(err){
        const error = new HttpError("something went wrong", 500)
        return next(error)


    }
    if(existingUser){
        const error = new HttpError('User exists already, please login', 422)
        return next(error)
    }
    


    const createUser= new User({
        id: uuidv4(),
        name,
        email,
        password,
        image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        places: []
        

    })
    try{
        await createUser.save()

    }catch(err){
        const error = new HttpError('Signing up failed went wrong', 500)
        return next(error)
    }
    res.status(201).json({
        user: createUser.toObject({getters: true})
    })


}

const userLogin = async(req,res,next)=>{
    const {email,password} = req.body
    let identifiedUser;
    try{
        identifiedUser = await User.findOne({email:email})

    } catch(err)
    {
        const error = new HttpError("Something went wrong", 500)
        return next(error)

    }

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Authentication failed!", 401)
    }

    res.status(200).json({
        message: "Login Successful!",
        user: existingUser.toObject({getter:true})
    })

}


const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find({}, '-password')

    }
    catch(err){
        const error = new HttpError('something went wrong', 500);
        return next(error)

    }
    
    res.json({
        users: users.map(user=> user.toObject({getters: true}))

    })

}
const getUserById = async (req,res,next)=>{
    const userId = req.params.uid
    let user;
    try{
        user = await User.findById(userId)
        if (!user) {
            // If the user is not found, return an empty object or a message
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            user:{
                id: userId,
                name : user.name,
                email: user.email,
                password: user.password,
                places: user.places,
                image:user.image,
                createdAt: user.createdAt
            }
        })

    }catch(err){
        const error = new HttpError('Something went wrong', 500)
        return next(error)

    }
    

   

  
}

exports.userSignUp = userSignUp
exports.userLogin = userLogin
exports.getAllUser = getAllUser
exports.getUserById = getUserById