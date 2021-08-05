import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { getLoanDetail } from "../actions/loanAction";
import Back from "../components/Back/Back";
import DetailLoan from "../components/DetailLoan/DetailLoan";

class DetailPeminjaman extends Component {
  componentDidMount() {
    this.props.dispatch(getLoanDetail(this.props.match.params.id));
  }

  render() {
    return (
      <Container>
        <Back />
        <h1>Detail</h1>
        <DetailLoan></DetailLoan>
      </Container>
    );
  }
}

export default connect()(DetailPeminjaman);
