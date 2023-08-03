import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

// amount={500} amount in cents ($5)
// Token is expecting to receive a callback function and that callback function will be called after we have successfully retrieved a authorization token from the Stripe API.

class Payments extends Component {
  render() {
    // debugger;
    console.log(process.env.REACT_APP_STRIPE_KEY);
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
