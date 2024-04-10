const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
    // route handlers
});

app.post("/", async (req, res) => {
    const{email,name,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }
});

app.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
    const userData = {
        email: email,
        name: name,
        password: password
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await collection.create(userData);
        }
    } catch (error) {
        res.json("fail");
    }
});


app.use("/api/calendar", require("./controllers/calendarcontroller"))
app.listen(8000, () => {
    console.log("port connected");
});