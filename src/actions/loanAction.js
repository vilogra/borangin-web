import axios from "axios";

export const GET_LOAN_LIST = "GET_LOAN_LIST";
export const GET_LOAN_DETAIL = "GET_LOAN_DETAIL";

export const getLoanList = () => {
  return (dispatch) => {
    axios
      .get("https://peminjaman-ruangan-api.herokuapp.com/loans/unsorted")
      .then((res) => {
        dispatch({
          type: GET_LOAN_LIST,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LOAN_LIST,
          payload: {
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};

export const getLoanDetail = (id) => {
  return (dispatch) => {
    axios
      .get("https://peminjaman-ruangan-api.herokuapp.com/loans/" + id)
      .then((res) => {
        dispatch({
          type: GET_LOAN_DETAIL,
          payload: {
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LOAN_DETAIL,
          payload: {
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};

export const acceptLoan = (id) => {
  return (dispatch) => {
    axios
      .patch("https://peminjaman-ruangan-api.herokuapp.com/loans/" + id, {
        diterima: true,
        status: "succeed",
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
};

export const rejectLoan = (id) => {
  return (dispatch) => {
    axios
      .patch("https://peminjaman-ruangan-api.herokuapp.com/loans/" + id, {
        diterima: true,
        status: "rejected",
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
};

// export const updateLoanDetail = (id) => {
//   return (dispatch) => {
//     axios
//       .get("https://peminjaman-ruangan-api.herokuapp.com/loans/" + id)
//       .then((res) => {
//         dispatch({
//           type: GET_LOAN_DETAIL,
//           payload: {
//             data: res.data,
//             errorMessage: false,
//           },
//         });
//       })
//       .catch((err) => {
//         dispatch({
//           type: GET_LOAN_DETAIL,
//           payload: {
//             data: false,
//             errorMessage: err.message,
//           },
//         });
//       });
//   };
// };
