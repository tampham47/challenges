import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import { summaryDonations } from './helpers';


const Container = styled.section`
  max-width: 48rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1em;
  position: relative;
  max-width: 400px;
`;
const ImgWrp = styled.div`
  position: absolute;
  z-index: -1;
  height: 170px;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
`;
const ToolbarWrp = styled.div`
  margin-top: 170px;
  display: flex;
  background-color: white;
`;
const Title = styled.h6`
  margin: 0;
  flex: auto;
`;
const Button = styled.button`
  border: 1px solid blue;
  color: blue;
  background-color: white;
`;
const Message = styled.p`
  color: red;
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;


class CardComp extends Component {
  constructor(props) {
    super(props);

    this.handlePay = this.handlePay.bind(this);
  }

  handlePay() {
    const { model } = this.props;
    this.props.handlePay(model.id, 10, model.currency);
  }

  render() {
    const { model } = this.props;

    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <label key={j}>
        <input
          type="radio"
          name="payment"
          onClick={function() {
            self.setState({ selectedAmount: amount })
          }} /> {amount}
      </label>
    ));

    return (
      <Card>
        <ImgWrp>
          <Img src={`/images/${model.image}`} alt={model.name} />
        </ImgWrp>
        <ToolbarWrp>
          <Title>{model.name}</Title>
        </ToolbarWrp>
        <div>
          {payments}
          <Button onClick={this.handlePay}>Pay</Button>
        </div>
      </Card>
    );
  }
}

export default connect((state) => state)(
  class App extends Component {
    constructor(props) {
      super();

      this.state = {
        charities: [],
        selectedAmount: 10,
      };

      this.handlePay = this.handlePay.bind(this);
    }

    componentDidMount() {
      const self = this;

      fetch('http://localhost:3001/charities')
        .then(function(resp) { return resp.json(); })
        .then(function(data) {
          self.setState({ charities: data }) });

      fetch('http://localhost:3001/payments')
        .then(function(resp) { return resp.json() })
        .then(function(data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount))),
          });
        })
    }

    handlePay(id, amount, currency) {
      const self = this;

      fetch('http://localhost:3001/payments', {
        method: 'POST',
        body: `{"charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
      })
        .then(function(resp) { return resp.json(); })
        .then(function() {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount,
          });
          self.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: `Thanks for donate ${amount}!`,
          });

          setTimeout(function() {
            self.props.dispatch({
              type: 'UPDATE_MESSAGE',
              message: '',
            });
          }, 2000);
        });
    }

    render() {
      const { donate, message } = this.props;
      const { charities } = this.state;

      return (
        <Container>
          <h1>Kamereo Tamboon React</h1>
          <p>All donations: {donate}</p>
          <Message>{message}</Message>

          {charities.map((item, i) => (
            <CardComp key={i} model={item} handlePay={this.handlePay} />
          ))}
        </Container>
      );
    }
  }
);
