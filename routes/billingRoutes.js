const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

// all these root handlers like Atget, Post, Aiport, whatever, take an arbitrary number of arguments so we could pass in as many middleware here as we want.
// the only requirement of Express is that eventually one of the functions inside this list right here, like be it require login, be it some other middleware we put in
// or be at this actual function that we defined ourselves right here.
// Eventually, one of these functions has to process the request and eventually send back a response to the user.
// That's the only requirement of express.
// It doesn't care how many little functions you toss in here, just eventually one of them has to actually say, OK, here's the actual response.

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // naive check that user is logged in or not
    // but might want to check in other routes in app
    // if (!req.user) {
    //   return res.status(401).send({ error: "You must log in!" });
    // }
    // pull out to be reusable (create new middleware)

    // console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });
    // console.log(charge);

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
