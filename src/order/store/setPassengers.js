import { SET_PASSENGERS } from './actionTypes';

export function setPassengers(passengers) {
  return {
    type: SET_PASSENGERS,
    payload: passengers
  };
}

let passengerIdSeed = 0;

export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState();

    // 如果上一个信息中有任何没有填写完成的信息, 将不会继续添加
    // 这里只是简单判断是否为空
    for (const passenger of passengers) {
      const keys = Object.keys(passenger);

      for (const key of keys) {
        if (!passenger[key]) {
          alert('请将信息填写完整');
          return;
        }
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          ticketType: 'adult',
          licenceNo: '',
          seat: 'Z'
        }
      ])
    );
  };
}

export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState();

    let adultFound = null;

    // 如果上一个信息中有任何没有填写完成的信息, 将不会继续添加
    // 这里只是简单判断是否为空
    for (const passenger of passengers) {
      const keys = Object.keys(passenger);

      for (const key of keys) {
        if (!passenger[key]) {
          alert('请将信息填写完整');
          return;
        }
      }

      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id;
      }
    }

    // 添加儿童至少需要有一个同行成人
    if (!adultFound) {
      alert('请至少正确添加一个同行成人');
      return;
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          gender: '',
          birthday: '',
          followAdult: adultFound,
          ticketType: 'child',
          seat: 'Z'
        }
      ])
    );
  };
}

export function removePassenger(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    // 过滤掉具有这个 id 的乘客, 同时过滤掉这个乘客同行的儿童
    const newPassengers = passengers.filter(
      passenger => passenger.id !== id && passenger.followAdult !== id
    );

    dispatch(setPassengers(newPassengers));
  };
}

export function updatePassenger(id, data, removeKeys = []) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; i++) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);

        for (const key of removeKeys) {
          delete newPassengers[i][key];
        }

        dispatch(setPassengers(newPassengers));

        break;
      }
    }
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PASSENGERS:
      return { ...state, passengers: payload };
    default:
      return state;
  }
}
