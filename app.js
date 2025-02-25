if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}




const express= require("express");
const app =express();
const mongoose= require("mongoose");
const Listing=require("./models/listing.js");
const path= require("path");
const methodOverride= require("method-override");
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));
const ejsMAte= require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const{validateReview}= require("./middleware.js");


const {storage}= require("./cloudConfig.js");

const Review=require("./models/review.js");

const multer  = require('multer');
const upload = multer({ storage });


const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const dbUrl= process.env.ATLASDB_URL;

const{isLoggedIn, isOwner, validateListing,isReviewAuthor}=require("./middleware.js");
const{saveRedirectUrl}=require("./middleware.js");
app.engine("ejs",ejsMAte);
app.use(express.static(path.join(__dirname,"/public")));


const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SCERET,
},
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("Error in Mongo Atlas",err);
});

const sessionOptions={
    store,
    secret:process.env.SCERET,
    resave:false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});


// const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";


main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
};


// app.get("/",(req,res)=>{
//     res.send("Server is workong");
// });




//Signup


app.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

app.post("/signup", wrapAsync(async(req,res)=>{
    try{
    let {username, email, password}=req.body;
    const newUser= new User({email, username});
    const registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    })
    
} catch(e){
    req.flash("error", e.message);
    res.redirect("/signup");
}

})
);

//Login

app.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

app.post("/login",saveRedirectUrl, passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash: true,
}),
async(req,res)=>{
    req.flash("successs", "Welcome back to WanderLust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
res.redirect(redirectUrl);
}
);



//Logout

app.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
})














app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

//Index route
app.get("/listings", wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//new route
app.get("/listings/new",isLoggedIn,(req,res)=>{
    // if(!req.isAuthenticated()){
    //     req.flash("error","You must be logged in to create listing!!");
    //     return res.redirect("/login");
    // }
    res.render("listings/new.ejs");
});

//Show route
app.get("/listings/:id", wrapAsync(async(req,res)=>{
    let{id}= req.params;
    const listing= await Listing.findById(id).populate({path: "reviews", populate:{path: "author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you are looking for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
}));


      



    //Create route

    app.post("/listings",isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(async(req,res,next)=>{
      
        let url=req.file.path;
        let filename= req.file.filename;
    

        const newListing= new Listing(req.body.listing);
      newListing.owner= req.user._id;
      newListing.image={url,filename};
    await newListing.save();
   
   
    req.flash("success","New listing created!");
        res.redirect("/listings");
    
})
    );









//Create route

//     app.post("/listings", async(req,res,next)=>{
//         try{
//         //let{title, description, image, price, country, location}= req.body;
//         const newListing= new Listing(req.body.listing);
//         await newListing.save();
//         res.redirect("/listings");
//    }catch(err){
// next(err);
// }
// });




//Edit route
app.get("/listings/:id/edit", isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id}= req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you are looking for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl= listing.image.url;
   originalImageUrl= originalImageUrl.replace("/upload","/upload/h_200,w_300");
    res.render("listings/edit.ejs",{listing, originalImageUrl});
}));


//update route

app.put("/listings/:id",upload.single("listing[image]"), isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let{id}= req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
   if(typeof req.file !== "undefined"){
   let url=req.file.path;
   let filename= req.file.filename;
   listing.image= {url,filename};
   await listing.save();
   req.flash("success"," Listing updated!");
    res.redirect(`/listings/${id}`);
   }
}));


//Delete route

app.delete("/listings/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let{id}= req.params;
    let DelList= await Listing.findByIdAndDelete(id);
    console.log(DelList);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
}));



//Review
//Post route

app.post("/listings/:id/reviews",isLoggedIn, validateReview,wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review is saved");
    req.flash("success","New Review created!");
    res.redirect(`/listings/${listing._id}`);

}));


//Delete review route

app.delete("/listings/:id/reviews/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
  let {id, reviewId}= req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});

  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");
  res.redirect(`/listings/${id}`);
}))

// app.get("/listing",async(req,res)=>{
//     let sampleListing= new Listing({
//         title: "My Home",
//         description: "Sweet",
//         price: 7777777,
//         location: "Panchkoshi",
//         country:"India",

//     });
//     await sampleListing.save();
//     console.log("Saved successfully..");
//     res.send("Success");
// });


app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page not found"));
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong"}= err;
res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
})




app.listen(8080,()=>{
console.log("Server is listening to port 8080");
});














// create List

       //let{title, description, image, price, country, location}= req.body;
      
    //   if(!req.body.listing){
    //     throw new ExpressError(400,"Send data for listing");
    //   }
    //   if(!newListing.title){
    //     throw new ExpressError(400,"Title is missing");
    //   }
    //   if(!newListing.description){
    //     throw new ExpressError(400,"Description is missing");
    //   }
    //   if(!newListing.price){
    //     throw new ExpressError(400,"Price is missing");
    //   }