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
//like promise
//async is used to return promise
app.post("/contact",async(req,res)=>
{try{//like resolve in promise
  const userData=new User(req.body);
await  userData.save();//wait and do the rest of work
res.status(201).render("index");


}catch (error)//catch is used to handle errors//like reject in promise
{
  res.status(500).send(error);
}
});
app.listen(port,()=>
{
  console.log("server is running succesfully");
});
