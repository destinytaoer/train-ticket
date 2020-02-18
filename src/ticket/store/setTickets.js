import { SET_TICKETS } from './actionTypes';

export function setTickets(tickets) {
  return {
    type: SET_TICKETS,
    payload: tickets
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TICKETS:
      return { ...state, tickets: payload };
    default:
      return state;
  }
}
