import { combineReducers } from "redux";

const searchActive = (state = false, action) => {
  switch (action.type) {
    case "ACTIVATE_SEARCH":
      return !state;
    default:
      return state;
  }
};

const id = (state = {}) => state;

function failureCatcher(state = { failed: 0 }, action) {
  switch (action.type) {
    case "GET_DATA_FAILURE":
      return {
        ...state,
        failed: state.failed + 1
      };
    default:
      return state;
  }
}

export default {
  focus: id,
  population_year: id,
  income_year: id,
  psu_year: id,
  presidential_election_year: id,
  senators_election_year: id,
  mayor_election_year: id,
  exports_year: id,
  imports_year: id,
  tax_data_year: id,
  nene_year: id,
  nene_month: id,
  sources: id,
  failureCatcher: failureCatcher,
  search: combineReducers({ searchActive })
};
