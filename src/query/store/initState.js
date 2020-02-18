import { ORDER_DEPART } from "../constants";
const initState = {
  from: null,
  to: null,
  date: Date.now(),
  isHighSpeed: false,
  trainList: [],
  orderType: ORDER_DEPART,
  hasTicket: false,
  ticketTypes: [], // 坐席类型
  checkedTicketTypes: {}, // 坐席类型是否选中
  trainTypes: [], // 车次类型
  checkedTrainTypes: {},
  leaveStations: [],
  checkedLeaveStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  leaveTimeStart: 0,
  leaveTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersActive: false,
  isSearchParsed: false
};

export default initState;