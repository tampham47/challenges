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

const Popout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.95);
  text-align: center;
`;
const PopoutBody = styled.div`
  padding-top: 3em;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  border: 0;
`;
const Helper = styled.p``;
const CheckWrp = styled.div`
  margin-bottom: 2em;
`;
const CheckItem = styled.label`
  padding: 0.7em;
  input {
    margin-right: 6px;
    vertical-align: text-top;
  }
`;


export default class CardComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAmount: 0,
      isDonate: false,
    };

    this.handlePay = this.handlePay.bind(this);
    this.setSelectedAmount = this.setSelectedAmount.bind(this);
    this.donate = this.donate.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  handlePay() {
    const { model } = this.props;
    const { selectedAmount } = this.state;
    if (!selectedAmount) { return; }
    this.props.handlePay(model.id, selectedAmount, model.currency);
    setTimeout(() => {
      this.dismiss();
    }, 2000);
  }

  setSelectedAmount(amount) {
    this.setState({
      selectedAmount: amount,
    });
  }

  donate() {
    this.setState({ isDonate: true });
  }
  dismiss() {
    this.setState({ isDonate: false });
  }

  render() {
    const { model } = this.props;
    const { isDonate } = this.state;

    return (
      <Card>
        <ImgWrp>
          <Img src={`/images/${model.image}`} alt={model.name} />
        </ImgWrp>
        <ToolbarWrp>
          <Title>{model.name}</Title>
          <Button onClick={this.donate}>Donate</Button>
        </ToolbarWrp>

        {isDonate && (
          <Popout>
            <CloseBtn onClick={this.dismiss}>✕</CloseBtn>
            <PopoutBody>
              <Helper>Select the amount to donate ({model.currency})</Helper>
              <CheckWrp>
                {[10, 20, 50, 100, 500].map((amount) => (
                  <CheckItem key={amount}>
                    <input
                      type="radio"
                      name="payment"
                      onClick={this.setSelectedAmount.bind(this, amount)} />{amount}
                  </CheckItem>
                ))}
              </CheckWrp>
              <Button onClick={this.handlePay}>Pay</Button>
            </PopoutBody>
          </Popout>
        )}
      </Card>
    );
  }
}
