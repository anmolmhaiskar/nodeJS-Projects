const { getUser } = require("../service/auth");


function checkForAuthentication(req, res, next){
  const token = req.cookies?.uid;
  req.user = null;

  const user = getUser(token);
  req.user = user;

  return next();
}

function restrictTo(roles = []){
  return function(req, res, next) {
    const user = req.user;

    if(!user){
      return res.redirect("/login");
    }

    if(!user.role || !roles.includes(user.role)){
      return res.end("You are unAuthorized to access this resource.");
    }

    return next();
  };
}

async function restrictToLoggedInUserOnly(req, res, next){
    const token = req.cookies?.uid;
    if (!token) {
      return res.redirect("/login");
    }
    
    const user = getUser(token);

    if(!user){
        return res.redirect("/login");
    }

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const token = req.cookies.uid;
   
    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
  checkForAuthentication,
  restrictTo,
  restrictToLoggedInUserOnly,
  checkAuth,
};