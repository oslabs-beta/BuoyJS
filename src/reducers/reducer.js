import * as types from '../constants/actionTypes';

const initialState = {
  tab: 0,
};

const reducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch(type) {
    case types.TEMP :

      return Object.assign(
        {}, 
        state, {
        }
      );
    default: {
      return state;
    }
  }

};

export default reducer;