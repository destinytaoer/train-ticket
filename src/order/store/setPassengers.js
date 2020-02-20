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
          gender: 'none',
          birthday: '',
          followAdult: '',
          ticketType: 'child',
          seat: 'Z'
        }
      ])
    );
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
