const initialState = {
  data: [],
};

const initializeReducer = (state = initialState, action) => {
  //console.log(state);
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default initializeReducer;
