const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Artical = require("./models/artical")
app.use(express.json())

//هنا نقوم بالإتصال بقاعدة البيانات من نوع mongodb عن طريق نسخ الرابط ولصقه هنا
mongoose.connect("mongodb+srv://abdoaltwar:0987654321a_@cluster0.bkm9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
  console.log("succces connect")
}).catch((error)=>{
  console.log("error"+error)
})



app.get("/",(req,res)=>{
    res.sendFile("")
})

////هذا الجزء مخصص لإضافة البيانات للجدول في قاعدة البيانات

app.post("/articals", async (req,res)=>{
    const title = req.body.title
    const body = req.body.body

    const newArtical = new Artical()
    newArtical.title = title
    newArtical.body = body
     newArtical.numberOfLikes = 100


    await  newArtical.save()
    //res.json(newArtical)
    .then(()=>{
        res.json(newArtical)
        res.status(201).send("نجاح الإرسال")
        
    })
    .catch((error)=>{

    })

   
})

app.get("/articals",async (req,res)=>{
    
    const articals = await Artical.find();

    res.status(202).json(articals)
})

app.get("/articals/:id",async (req,res)=>{
    const id = req.params.id
    try{
    
    const articals = await Artical.findById(id);

    res.status(202).json(articals)
    return;
    }
    catch{
        res.status(405).send("هذا العنصر غير موجود")
        return;
    }
})

app.get("/html", async (req,res)=>{
    const artical = await Artical.find()

    res.render("home.ejs",{
        allArticals : artical
    })
})

app.delete("/articals/:id",async (req,res)=>{
    const id = req.params.id
    const articals = await Artical.findByIdAndDelete(id);

    res.status(202).json("تم الحذف")
})
 

app.listen(3000,()=>{
    console.log("http://localhost:3000/")
})