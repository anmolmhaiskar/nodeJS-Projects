const URL = require("../models/url");
const shortid = require("shortid");

async function handleGetRedirectedURL(req, res){
    const body = req.body;
    
    if(!body){
        return res.status(400).json({ msg : "Bad Request. Request body is improper"});
    }
    
    const shortID = req.params.short_id;
    console.log("short_id:", shortID);
    const entry = await URL.findOneAndUpdate(
      {
        short_id : shortID,
      },
      {
        $push : {
          visit_history : {
            timestamp : Date.now(),
          },
        },
      }
    );

    return res.redirect(entry.redirect_url);
}


async function handleGenerateShortenedURL(req, res){
    const shortID = shortid.generate();
    const body = req.body;
    const result = await URL.create({
        short_id : shortID,
        redirect_url : body.url,
        visit_history : [],
        created_by : req.user._id,
    });

    return res.render("home", { id : shortID });

    // return res.status(201).json({msg : "Short URL generated Successfully!!"});
}

async function handleGetAllURLS(req, res){
  const user = req.user;
  console.log("user", user);
  const allURLS = await URL.find({
    created_by: user._id,
  });
  console.log("allURLS", allURLS);

  return res.render("home", {
    urls : allURLS,
  });
}

module.exports = {
  handleGetRedirectedURL,
  handleGenerateShortenedURL,
  handleGetAllURLS,
};