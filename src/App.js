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

const Message = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 9;
`;
const MessageBody = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-width: calc(100% - 2rem);
  width: 280px;
  padding: 2rem;
  border-radius: 4px;
  background-color: whitesmoke;
  text-align: center;
  font-size: 1rem;

  img {
    width: 50px;
    margin-left: auto;
    margin-right: auto;
  }
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
      fetch('http://localhost:3001/charities')
        .then(resp => resp.json())
        .then(data => {
          this.setState({ charities: data }) 
        });
          
      fetch('http://localhost:3001/payments')
        .then(resp => resp.json())
        .then(data => {
          this.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => (item.amount))),
          });
        });
    }

    handlePay(id, amount, currency) {
      const body = {
        charitiesId: id,
        amount,
        currency,
      };

      fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(resp => resp.json())
        .then(() => {
          this.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount,
          });
          this.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message: `Thanks for donate ${amount}!`,
          });

          setTimeout(() => {
            this.props.dispatch({
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
          <h1>Kamereo Tamboon</h1>
          <p>All donations: {donate}</p>

          {message && (
            <Message>
              <MessageBody>
                <img src="/images/heart.png" alt="donate" />
                <p>Thank you for your donation!</p>
              </MessageBody>
            </Message>
          )}

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
