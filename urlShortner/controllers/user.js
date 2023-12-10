const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");


async function handleUserSignup(req, res){
    const body = req.body;

    if(!body || !body.name || !body.email || !body.password){
        return res.status(400).send({ msg : "Invalid Request" });
    }

    const user =  await User.create({
        name : body.name,
        email : body.email,
        password : body.password,
    });

    req.user = user;
    return res.redirect("/login");
}

async function handleUserLogin(req, res){
    const body = req.body;

    if (!body || !body.email || !body.password) {
      return res.status(400).send({ msg: "Invalid Request" });
    }

    const user = await User.findOne({
        email : body.email,
        password : body.password
    });

    if(!user){
        return res.render("login", { 
            error: "Invalid username or password",
        });
    }

    const token = setUser(user);
    res.cookie("uid", token);

    return res.redirect("/");
}


module.exports = {
  handleUserSignup,
  handleUserLogin,
};