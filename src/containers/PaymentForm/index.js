import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, injectStripe } from 'react-stripe-elements';

class PaymentForm extends Component {

  handleSubmit(event) {
    event.preventDefault();

    this.props.stripe.createToken({ name: `John Smith` })
      .then(result => {
        if (!result.error) {
          this.setPaymentMethod(result.token.id);
        }
      });
  }

  setPaymentMethod(token) {
    // TODO: Send to server to set customer payment token
    console.log(token);
  }

  render() {
    const style = {
      base: {
        fontSize: `18px`
      }
    }

    return (
      <div className="payment_form_container">
        <form className='payment_form' onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Card Number
            <CardNumberElement  style={style}/>
          </label>
          <div className='exp_cvc_row'>
            <label>
              Exp. Date
              <CardExpiryElement style={style}/>
            </label>
            <label>
              CVC
              <CardCVCElement style={style}/>
            </label>
          </div>
          <label>
            Zip Code
            <PostalCodeElement style={style}/>
          </label>
          <input type='submit' value='SAVE' />
        </form>
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

const ConnectedPaymentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm);

export default injectStripe(ConnectedPaymentForm);