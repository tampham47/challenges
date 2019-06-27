import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import { summaryDonations } from './helpers';
import Card from './Card';

const Container = styled.section`
  width: calc(100% - 2rem);
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
`;
const CardWrp = styled.div`
  margin-bottom: 8em;
  /* responsive for mobile first */
  @media only screen and (min-width: 56rem) {
    display: flex;
    flex-wrap: wrap;
    margin-left: -1em;
    margin-right: -1em;
  }
`;
const CardItem = styled.div`
  width: 100%;
  margin-bottom: 1em;
  @media only screen and (min-width: 56rem) {
    width: 50%;
    width: calc(50% - 2em);
    margin-left: 1em;
    margin-right: 1em;
    margin-bottom: 2em;
  }
`;
const Message = styled.p`
  color: red;
  margin: 1em 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

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

          <CardWrp>
            {charities.map((item, i) => (
              <CardItem key={i}>
                <Card model={item} handlePay={this.handlePay} />
              </CardItem>
            ))}
          </CardWrp>
        </Container>
      );
    }
  }
);
