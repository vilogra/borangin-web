import React from "react";
import { Jumbotron as JumbotronComponent, Button, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    title: state.loans.title,
  };
};

const Jumbotron = (props) => {
  return (
    <div>
      <JumbotronComponent>
        <Container>
          <h1 className="display-3">{props.title}</h1>
          <p className="lead">
            Sistem informasi peminjaman ruangan dan laboratorium IF
            (Informatika)
          </p>
        </Container>
      </JumbotronComponent>
    </div>
  );
};

export default connect(mapStateToProps, null)(Jumbotron);
