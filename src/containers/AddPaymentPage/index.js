import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StripeProvider, Elements } from 'react-stripe-elements';

import PaymentForm from '../PaymentForm';

const PUBLIC_KEY = `pk_test_SJ1CxkkCLDxc0a5amCHUW3kz`;

class AddPaymentPage extends Component {
  render() {
    return (
      <div className="payment_form_container">
        <h1>Add Payment</h1>
        <StripeProvider apiKey={PUBLIC_KEY}>
          <Elements>
            <PaymentForm />
          </Elements>
        </StripeProvider>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const ConnectedAddPaymentPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPaymentPage);

export default ConnectedAddPaymentPage;