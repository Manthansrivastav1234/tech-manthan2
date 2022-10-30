const express= require("express");
const path=require("path");
require("./db/conn")
const User=require("./models/usermessage")
const hbs=require("hbs");

const app=express();


const port=process.env.PORT||3000;
//seting the path
const staticpath=path.join(__dirname,"../public");
const templatespath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");
//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'hbs');
app.set("views",templatespath);
hbs.registerPartials(partialspath);

//rrouting

app.get("/",(req,res)=>{
  res.render("index");
});
app.get("/contact",(req,res)=>{
  res.render("contact");
});
app.post("/contact",async(req,res)=>
{try{
  const userData=new User(req.body);
await  userdata.save();
res.status(201).render("index");


}catch (error)
{
  res.status(500).send(error);
}




});
app.listen(port,()=>
{
  console.log("server is running succesfully");
});
