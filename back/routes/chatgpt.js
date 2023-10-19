// const router = require("express").Router();

// router.post("/register", async (res,res) => {
//     try{
//         const counter = await.Counter.findOne({name : "counter"})

//         const newUser = new User({
//             username : req.body.username,
//             email : req.body.email,
//             password : req.body.password,
//             userNum : counter.userNum
//         });

//         const savedUser = await newUser.save();

//         const updasteCounter = await Counter.updateOne({
//             name : "counter"},
//             {$inc : {userNum : 1}}
//         );
//         res.statusCode(201).json({success : true});
//     }catch(err){
//         res.statusCode(500).json(err);
//     }
// });

// router.post("/login", async (res, res) => {
//     try{
//         const user = await User.findOne({
//             email : req.body.eamil,
//         }).exec();

//         !user && res.statusCode(401).json("Wrong User Name");

//         const hashedPassword = CryptoJS.AES.decrypt(user.password,)

//         const originalPassword = hashedPassword.toString(CryptoJs)

//         const inputPassword = req.body.password;

//         const accessToken = jwt.sign({
//             id : user._id,
//         },
//         "imuchgabi",
//         {expireIn : "3d"});

//         const {password, ...others} = user_doc;

//         res.status(200).json({...others,accessToken,success : true})}
//         catch(err){
//             res.status(500).json(err);
//         }
//     }
// )

// module.exports = router;
