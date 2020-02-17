import initState from './initState';
import { reducer as setCityReducer } from './setCity';
import { reducer as setDateReducer } from './setDate';
import { reducer as setHighSpeedReducer } from './setHighSpeed';
import { reducer as setTrainListReducer } from './setTrainList';
import { reducer as toggleOrderTypeReducer } from './toggleOrderType';
import { reducer as toggleHasTicketReducer } from './toggleHasTicket';
import { reducer as setTicketTypesReducer } from './setTicketTypes';
import { reducer as setTrainTypesReducer } from './setTrainTypes';
import { reducer as setLeaveStationsReducer } from './setLeaveStations';
import { reducer as setArriveStationsReducer } from './setArriveStations';
import { reducer as setLeaveTimeReducer } from './setLeaveTime';
import { reducer as setArriveTimeReducer } from './setArriveTime';
import { reducer as setFiltersActiveReducer } from './setFiltersActive';
import { reducer as setSearchParsedReducer } from './setSearchParsed';

const reducers = [
  setCityReducer,
  setDateReducer,
  setHighSpeedReducer,
  setTrainListReducer,
  toggleOrderTypeReducer,
  toggleHasTicketReducer,
  setTicketTypesReducer,
  setTrainTypesReducer,
  setLeaveStationsReducer,
  setArriveStationsReducer,
  setLeaveTimeReducer,
  setArriveTimeReducer,
  setFiltersActiveReducer,
  setSearchParsedReducer,
];

export default function reducer(state = initState, action) {
  return reducers.reduce((s, r) => r(s, action), state);
}