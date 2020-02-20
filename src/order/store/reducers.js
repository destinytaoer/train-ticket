import initState from './initState';
import { reducer as setDateReducer } from './setDate';
import { reducer as setTimeReducer } from './setTime';
import { reducer as setStationReducer } from './setStation';
import { reducer as setSeatTypeReducer } from './setSeatType';
import { reducer as setTrainNumberReducer } from './setTrainNumber';
import { reducer as setDurationStrReducer } from './setDurationStr';
import { reducer as setPriceReducer } from './setPrice';
import { reducer as setPassengersReducer } from './setPassengers';
import { reducer as setMenuReducer } from './setMenu';
import { reducer as setSearchParsedReducer } from './setSearchParsed';

const reducers = [
  setDateReducer,
  setTimeReducer,
  setStationReducer,
  setSeatTypeReducer,
  setTrainNumberReducer,
  setDurationStrReducer,
  setPriceReducer,
  setPassengersReducer,
  setMenuReducer,
  setSearchParsedReducer
];

export default function reducer(state = initState, action) {
  return reducers.reduce((s, r) => r(s, action), state);
}
