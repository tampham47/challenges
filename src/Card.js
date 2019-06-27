import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  box-shadow: 3px 3px 6px #dcdcdc;
`;
const ImgWrp = styled.div`
  position: relative;
  z-index: -1;
  height: 170px;
  width: 100%;
  overflow: hidden;
`;
const Img = styled.img`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ToolbarWrp = styled.div`
  padding: 1em;
  display: flex;
  background-color: white;
  display: flex;
  align-items: center;
`;
const Title = styled.h6`
  margin: 0;
  font-size: 1em;
  flex: auto;
  text-overflow: ellipsis;
  margin-right: 1em;
  opacity: 0.7;
`;
const Button = styled.button`
  border: 1px solid #1a52ef;
  color: #1a52ef;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  padding: 0.5em 1em;
`;


export default class CardComp extends Component {
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
          <Button>Donate</Button>
        </ToolbarWrp>
        <div style={{ display: 'none' }}>
          {payments}
          <Button onClick={this.handlePay}>Pay</Button>
        </div>
      </Card>
    );
  }
}
