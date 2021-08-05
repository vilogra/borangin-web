import React from "react";
import moment from "moment";
import "moment/locale/id";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { acceptLoan, rejectLoan } from "../../actions/loanAction";

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
      }, 2000);
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
  }).then(async (willReject) => {
    if (willReject) {
      dispatch(acceptLoan(id));
      swal("Pengajuan berhasil diterima", { icon: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      swal("Pengajuan tidak diproses");
    }
  });
};

const DetailLoan = (props) => {
  return (
    <Table striped>
      <tbody>
        <tr>
          <td width="300">Nama Pengaju Ruangan</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.namaPengajuRuangan}</td>
        </tr>
        <tr>
          <td width="300">No. HP Ruangan</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.hpPengajuRuangan}</td>
        </tr>
        {props.getLoanDetail &&
          props.getLoanDetail.ruangan.map((object, index) => {
            return (
              <tr key={index}>
                <td width="300">Ruangan {index + 1}</td>
                <td width="10">:</td>
                <td key={index}> {object}</td>
              </tr>
            );
          })}
        <tr>
          <td width="300">Tanggal Mulai Kegiatan</td>
          <td width="10">:</td>
          <td>
            {props.getLoanDetail &&
              `
              ${moment(props.getLoanDetail.tanggalMulaiKegiatan).format(
                "dddd, DD MMM YYYY"
              )}. Pukul ${moment(
                props.getLoanDetail.tanggalMulaiKegiatan
              ).format("hh.mm")}`}
          </td>
        </tr>
        <tr>
          <td width="300">Tanggal Akhir Kegiatan</td>
          <td width="10">:</td>
          <td>
            {props.getLoanDetail &&
              `
              ${moment(props.getLoanDetail.tanggalAkhirKegiatan).format(
                "dddd, DD MMM YYYY"
              )}. Pukul ${moment(
                props.getLoanDetail.tanggalAkhirKegiatan
              ).format("hh.mm")}`}
          </td>
        </tr>
        <tr>
          <td width="300">Penanggung Jawab</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.penanggungJawab}</td>
        </tr>
        <tr>
          <td width="300">Pendamping Acara</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.pendampingAcara}</td>
        </tr>
        <tr>
          <td width="300">Pengarah Kegiatan</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.pengarahKegiatan}</td>
        </tr>
        <tr>
          <td width="300">Jumlah Tamu</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.jumlahTamu}</td>
        </tr>
        <tr>
          <td width="300">Sifat</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.sifat}</td>
        </tr>
        <tr>
          <td width="300">Jenis</td>
          <td width="10">:</td>
          <td>{props.getLoanDetail.jenis}</td>
        </tr>
        {props.getLoanDetail.keterangan && (
          <tr>
            <td width="300">Keterangan</td>
            <td width="10">:</td>
            <td>{props.getLoanDetail.keterangan}</td>
          </tr>
        )}
        {!props.getLoanDetail.diterima ? (
          <tr>
            <td width="300">Status</td>
            <td width="10">:</td>
            <td>
              <Button
                color="dark"
                className="mr-1"
                onClick={() => {
                  handleClickAccept(
                    props.dispatch,
                    props.getLoanDetail._id,
                    props.getLoanDetail.namaPengajuRuangan,
                    props.getLoanDetail.ruangan
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
                    props.getLoanDetail._id,
                    props.getLoanDetail.namaPengajuRuangan,
                    props.getLoanDetail.ruangan
                  );
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> Tolak
              </Button>
            </td>
          </tr>
        ) : (
          <tr>
            <td width="300">Status</td>
            <td width="10">:</td>
            <td>
              {props.getLoanDetail.status === "succeed"
                ? "Diterima"
                : "Ditolak"}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    getLoanDetail: state.loans.getLoanDetail,
    errorLoanDetail: state.loans.errorLoanDetail,
  };
};

export default connect(mapStateToProps, null)(DetailLoan);
