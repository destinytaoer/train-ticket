import { SET_MENU, TOGGLE_MENU_VISIBLE } from './actionTypes';
import { updatePassenger } from './setPassengers';

export function setMenu(menu) {
  return {
    type: SET_MENU,
    payload: menu
  };
}

export function setMenuVisible(isMenuVisible) {
  return {
    type: TOGGLE_MENU_VISIBLE,
    payload: isMenuVisible
  };
}

export function showMenu(menu) {
  return dispatch => {
    dispatch(setMenu(menu));
    dispatch(setMenuVisible(true));
  };
}

export function showGenderMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return;

    dispatch(
      showMenu({
        title: '请选择性别',
        options: [
          {
            title: '男',
            value: 'male',
            active: 'male' === passenger.gender
          },
          {
            title: '女',
            value: 'female',
            active: 'female' === passenger.gender
          }
        ],
        handleClick(gender) {
          dispatch(updatePassenger(id, { gender }));
          dispatch(hideMenu());
        }
      })
    );
  };
}

export function showFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return;

    dispatch(
      showMenu({
        title: '请选择同行成人',
        options: passengers
          .filter(passenger => passenger.ticketType === 'adult')
          .map(adult => ({
            title: adult.name,
            value: adult.id,
            active: adult.id === passenger.followAdult
          })),
        handleClick(followAdult) {
          dispatch(updatePassenger(id, { followAdult }));
          dispatch(hideMenu());
        }
      })
    );
  };
}

export function showTicketTypeMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) return;

    dispatch(
      showMenu({
        title: '请选择同行成人',
        options: [
          {
            title: '成人票',
            value: 'adult',
            active: passenger.ticketType === 'adult'
          },
          {
            title: ' 儿童票',
            value: 'child',
            active: passenger.ticketType === 'child'
          }
        ],
        handleClick(ticketType) {
          if (ticketType === 'adult') {
            dispatch(
              updatePassenger(
                id,
                {
                  licenceNo: '',
                  ticketType
                },
                ['gender', 'followAdult', 'birthday']
              )
            );
          } else {
            const adult = passengers.find(
              passenger => passenger.id !== id && passenger.ticketType === 'adult'
            );

            const children = passengers.filter(passenger => passenger.followAdult === id);

            if (adult) {
              dispatch(
                updatePassenger(
                  id,
                  {
                    ticketType,
                    gender: '',
                    followAdult: adult.id,
                    birthday: ''
                  },
                  ['licenceNo']
                )
              );
              children.forEach(child => {
                const id = child.id;

                dispatch(
                  updatePassenger(id, {
                    followAdult: adult.id
                  })
                );
              });
            } else {
              alert('必须至少有一个成人乘客');
            }
          }
          dispatch(hideMenu());
        }
      })
    );
  };
}

export function hideMenu() {
  return setMenuVisible(false);
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MENU:
      return { ...state, menu: payload };
    case TOGGLE_MENU_VISIBLE:
      return { ...state, isMenuVisible: payload };
    default:
      return state;
  }
}
