import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Container, Button, Row, Col, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import { acceptLoan, rejectLoan } from "../../actions/loanAction";

const { SearchBar } = Search;

const handleClick = (dispatch, id, namaPengajuRuangan, ruangan) => {
  swal({
    title: "Tolak Pengajuan?",
    text: `${namaPengajuRuangan}, ${ruangan}`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willReject) => {
    if (willReject) {
      dispatch(rejectLoan(id));
      swal("Pengajuan berhasil ditolak", { icon: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      swal("Pengajuan tidak diproses");
    }
  });
};

const handleClickAccept = (dispatch, id, namaPengajuRuangan, ruangan) => {
  swal({
    title: "Terima Pengajuan?",
    text: `${namaPengajuRuangan}, ${ruangan}`,
    icon: "info",
    buttons: true,
  }).then((willReject) => {
    if (willReject) {
      dispatch(acceptLoan(id));
      swal("Pengajuan berhasil diterima", { icon: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      swal("Pengajuan tidak diproses");
    }
  });
};

function indexN(cell, row, enumObject, index) {
  return <div>{enumObject + 1}</div>;
}

const defaultSorted = [
  {
    dataField: "_id",
    order: "asc",
  },
];

const Table = (props) => {
  const columns = [
    {
      dataField: "_id",
      text: "No.",
      formatter: indexN,
      sort: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      dataField: "namaPengajuRuangan",
      text: "Nama Pengaju",
    },
    {
      dataField: "ruangan",
      text: "Ruangan",
      formatter: (rowContent, row) => {
        return row.ruangan.map((data, index) => {
          return <p key={index}>{data}</p>;
        });
      },
    },
    {
      dataField: "status",
      text: "Status",
      headerStyle: () => {
        return { width: "8%" };
      },
      formatter: (rowContent, row) => {
        return (
          <>
            {row.diterima === false ? (
              <div className="text-center">Belum diproses</div>
            ) : (
              <div className="text-center">
                {row.status === "succeed" ? "Diterima" : "Ditolak"}
              </div>
            )}
          </>
        );
      },
    },
    {
      dataField: "link",
      text: "Action",
      formatter: (rowContent, row) => {
        return (
          <div className="text-center">
            <Link to={"detail/" + row._id}>
              <Button color="dark" className="mr-1">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>

            {row.diterima === false ? (
              <>
                <Button
                  color="dark"
                  className="mr-1"
                  onClick={() => {
                    handleClickAccept(
                      props.dispatch,
                      row._id,
                      row.namaPengajuRuangan,
                      row.ruangan
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} /> Terima
                </Button>

                <Button
                  color="dark"
                  onClick={() => {
                    handleClick(
                      props.dispatch,
                      row._id,
                      row.namaPengajuRuangan,
                      row.ruangan
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Tolak
                </Button>
              </>
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <Container>
      {props.getLoanList ? (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.getLoanList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col>
                  <div className="float-right">
                    <SearchBar {...props.searchProps} placeholder="Cari..." />
                  </div>
                </Col>
              </Row>
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
              ></BootstrapTable>
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <div className="text-center">
          {props.errorLoanList ? (
            <h1>{props.errorLoanList}</h1>
          ) : (
            <Spinner color="dark" />
          )}
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    getLoanList: state.loans.getLoanList,
    errorLoanList: state.loans.errorLoanList,
  };
};

export default connect(mapStateToProps, null)(Table);
