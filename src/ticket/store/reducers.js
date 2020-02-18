import initState from './initState';
import { reducer as setDateReducer } from './setDate';
import { reducer as setTimeReducer } from './setTime';
import { reducer as setStationReducer } from './setStation';
import { reducer as setTicketsReducer } from './setTickets';
import { reducer as setTrainNumberReducer } from './setTrainNumber';
import { reducer as setDurationStrReducer } from './setDurationStr';
import { reducer as setSearchParsedReducer } from './setSearchParsed';
import { reducer as toggleScheduleVisibleReducer } from './toggleScheduleVisible';

const reducers = [
  setDateReducer,
  setTimeReducer,
  setStationReducer,
  setTicketsReducer,
  setTrainNumberReducer,
  setDurationStrReducer,
  setSearchParsedReducer,
  toggleScheduleVisibleReducer
];

export default function reducer(state = initState, action) {
  return reducers.reduce((s, r) => r(s, action), state);
}
