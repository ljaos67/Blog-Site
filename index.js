import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogStorage = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{blogStorage:blogStorage});
});

app.post("/createPost",(req,res)=>{
    res.render("essays.ejs");
});

app.post("/readPost",(req,res)=>{
    const itemId = req.body.itemId;
    res.render("read.ejs",{title: blogStorage[itemId][0], blogText:blogStorage[itemId][1], index:itemId});
});

app.post("/editPostInit",(req,res)=>{
    const itemId = req.body.itemId;
    res.render("edit.ejs",{title: blogStorage[itemId][0], blogText:blogStorage[itemId][1], index:itemId});
});

app.post("/editPostSubmit",(req,res)=>{
    const index = req.body.index;
    const title = req.body.title;
    const blogText = req.body.blogText;
    blogStorage[index][0] = title;
    blogStorage[index][1] = blogText;
    res.redirect('/');
});

app.post("/deletePost",(req,res)=>{
    blogStorage.splice(req.body.itemId,1);
    res.redirect('/');
});

app.post("/submitPost",(req,res)=>{
    blogStorage.push([req.body.postTitle, req.body.postMessage]);
    console.log(blogStorage);
    res.redirect('/');
});

app.listen(port, ()=>{
console.log(`Listening on port ${port}`);
});