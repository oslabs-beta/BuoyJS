import * as types from '../constants/actionTypes';

const initialState = {

};

const reducer = (state = initialState, action) => {
  
  const { type, payload } = action;

  switch(type) {
    case types.TEMP :

      return Object.assign(
        {}, 
        state, {
        summonerName: payload.summonerName,
        summonerLevel: payload.summonerLevel,
        matchHistory: payload.matchHistory,
        summonerRank: payload.summonerRank,
        otherPlayersMatches: payload.otherPlayersMatches,
        }
      );
    default: {
      return state;
    }
  }

};

export default reducer;