import { TOGGLE_HAS_TICKET } from "./actionTypes";

export function toggleHasTicket() {
  return (dispatch, getState) => {
    const { hasTicket } = getState();
    dispatch({
      type: TOGGLE_HAS_TICKET,
      payload: !hasTicket
    })
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_HAS_TICKET:
      return { ...state, hasTicket: payload };
    default:
      return state;
  }
}
