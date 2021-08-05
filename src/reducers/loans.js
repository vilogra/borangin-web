import { GET_LOAN_DETAIL, GET_LOAN_LIST } from "./../actions/loanAction";

let initialState = {
  getLoanList: false,
  getLoanDetail: false,
  errorLoanList: false,
  errorLoanDetail: false,
  title: "Borangin",
};

const loans = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOAN_LIST:
      return {
        ...state,
        getLoanList: action.payload.data,
        errorLoanList: action.payload.errorMessage,
      };
    case GET_LOAN_DETAIL:
      return {
        ...state,
        getLoanDetail: action.payload.data,
        errorLoanDetail: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default loans;
