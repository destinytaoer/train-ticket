import { SET_TICKET_TYPES, SET_CHECKED_TICKET_TYPES } from "./actionTypes";

export function setTicketTypes(ticketTypes) {
  return {
    type: SET_TICKET_TYPES,
    payload: ticketTypes
  }
}
export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: SET_CHECKED_TICKET_TYPES,
    payload: checkedTicketTypes
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TICKET_TYPES:
      return { ...state, ticketTypes: payload };
    case SET_CHECKED_TICKET_TYPES:
      return { ...state, checkedTicketTypes: payload };
    default:
      return state;
  }
}
