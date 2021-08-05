import React, { Component } from "react";
import Table from "../components/Table/Table";
import { connect } from "react-redux";
import { getLoanList } from "../actions/loanAction";

class HomePeminjaman extends Component {
  componentDidMount() {
    this.props.dispatch(getLoanList());
  }

  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}

export default connect()(HomePeminjaman);
