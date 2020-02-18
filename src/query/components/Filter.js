import React, { memo, useMemo, useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';

import './Filter.css';
import { ORDER_DEPART } from '../constants';
import Slider from './Slider';

function checkedReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'toggle':
      const newState = { ...state };
      if (payload in newState) {
        delete newState[payload];
      } else {
        newState[payload] = true;
      }
      return newState;
    case 'reset':
      return {};
    default:
      return state;
  }
}

const Option = memo(function Option(props) {
  const { name, checked, value, dispatch } = props;

  return (
    <li className={checked ? 'checked' : ''} onClick={() => dispatch({type: 'toggle', payload: value})}>
      {name}
    </li>
  );
});
Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Options = memo(function Options(props) {
  const { title, options, checkedMap, dispatch } = props;

  return (
    <div className='option'>
      <h3>{title}</h3>
      <ul>
        {options.map(option => (
          <Option
            key={option.value}
            {...option}
            checked={option.value in checkedMap}
            dispatch={dispatch}
          />
        ))}
      </ul>
    </div>
  );
});
Options.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const FilterModal = memo(function FilterModal(props) {
  const {
    toggleFiltersActive,
    ticketTypes,
    trainTypes,
    leaveStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedLeaveStations,
    checkedArriveStations,
    leaveTimeStart,
    leaveTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedLeaveStations,
    setCheckedArriveStations,
    setLeaveTimeStart,
    setLeaveTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props;

  const [localCheckedTicketTypes, dispatchLocalCheckedTicketTypes] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    checkedTicketTypes => ({ ...checkedTicketTypes })
  );
  const [localCheckedTrainTypes, dispatchLocalCheckedTrainTypes] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    checkedTrainTypes => ({ ...checkedTrainTypes })
  );
  const [localCheckedLeaveStations, dispatchLocalCheckedLeaveStations] = useReducer(
    checkedReducer,
    checkedLeaveStations,
    checkedLeaveStations => ({ ...checkedLeaveStations })
  );
  const [
    localCheckedArriveStations,
    dispatchLocalCheckedArriveStations
  ] = useReducer(
    checkedReducer,
    checkedArriveStations,
    checkedArriveStations => ({
    ...checkedArriveStations
  }));

  const [localLeaveTimeStart, setLocalLeaveTimeStart] = useState(leaveTimeStart);
  const [localLeaveTimeEnd, setLocalLeaveTimeEnd] = useState(leaveTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

  const isResetDisabled = useMemo(
    () =>
      (Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainTypes).length === 0 &&
      Object.keys(localCheckedLeaveStations).length === 0 &&
      Object.keys(localCheckedArriveStations).length === 0 &&
      localLeaveTimeStart === 0 &&
      localLeaveTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24),
    [
      localCheckedTicketTypes,
      localCheckedTrainTypes,
      localCheckedLeaveStations,
      localCheckedArriveStations,
      localLeaveTimeStart,
      localLeaveTimeEnd,
      localArriveTimeStart,
      localArriveTimeEnd
    ]
  );

  const handleReset = useCallback(() => {
    if (isResetDisabled) return;

    dispatchLocalCheckedTicketTypes({type: 'reset'});
    dispatchLocalCheckedTrainTypes({ type: 'reset' });
    dispatchLocalCheckedLeaveStations({ type: 'reset' });
    dispatchLocalCheckedArriveStations({ type: 'reset' });
    setLocalLeaveTimeStart(0);
    setLocalLeaveTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }, [isResetDisabled]);

  const handleSubmit = useCallback(() => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedLeaveStations(localCheckedLeaveStations);
    setCheckedArriveStations(localCheckedArriveStations);
    setLeaveTimeStart(localLeaveTimeStart);
    setLeaveTimeEnd(localLeaveTimeEnd);
    setArriveTimeStart(localArriveTimeStart);
    setArriveTimeEnd(localArriveTimeEnd);

    toggleFiltersActive();
  }, [
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedLeaveStations,
    setCheckedArriveStations,
    setLeaveTimeStart,
    setLeaveTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleFiltersActive,
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedLeaveStations,
    localCheckedArriveStations,
    localLeaveTimeStart,
    localLeaveTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd
  ]);

  const optionsGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      dispatch: dispatchLocalCheckedTicketTypes
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      dispatch: dispatchLocalCheckedTrainTypes
    },
    {
      title: '出发车站',
      options: leaveStations,
      checkedMap: localCheckedLeaveStations,
      dispatch: dispatchLocalCheckedLeaveStations
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      dispatch: dispatchLocalCheckedArriveStations
    }
  ];

  return (
    <div className='filter-modal'>
      <div className='filter-dialog'>
        <div className='filter-dialog-content'>
          <div className='title'>
            <span
              className={['reset', isResetDisabled ? 'disabled' : ''].filter(Boolean).join(' ')}
              onClick={() => handleReset()}>
              重置
            </span>
            <span className='ok' onClick={() => handleSubmit()}>
              确定
            </span>
          </div>
          <div className='options'>
            {optionsGroup.map(options => (
              <Options {...options} key={options.title} />
            ))}
            <Slider
              title='出发时间'
              currentStartHours={localLeaveTimeStart}
              currentEndHours={localLeaveTimeEnd}
              onStartChanged={setLocalLeaveTimeStart}
              onEndChanged={setLocalLeaveTimeEnd}
            />
            <Slider
              title='到达时间'
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
FilterModal.propTypes = {
  toggleFiltersActive: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  leaveStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedLeaveStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  leaveTimeStart: PropTypes.number.isRequired,
  leaveTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedLeaveStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setLeaveTimeStart: PropTypes.func.isRequired,
  setLeaveTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired
};
function Filter(props) {
  const {
    orderType,
    isHighSpeed,
    hasTicket,
    isFiltersActive,
    toggleOrderType,
    toggleHighSpeed,
    toggleHasTicket,
    toggleFiltersActive,

    ticketTypes,
    trainTypes,
    leaveStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedLeaveStations,
    checkedArriveStations,
    leaveTimeStart,
    leaveTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedLeaveStations,
    setCheckedArriveStations,
    setLeaveTimeStart,
    setLeaveTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props;

  const noChecked = useMemo(
    () =>
      Object.keys(checkedTicketTypes).length === 0 &&
      Object.keys(checkedTrainTypes).length === 0 &&
      Object.keys(checkedLeaveStations).length === 0 &&
      Object.keys(checkedArriveStations).length === 0 &&
      leaveTimeStart === 0 &&
      leaveTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24,
    [
      checkedTicketTypes,
      checkedTrainTypes,
      checkedLeaveStations,
      checkedArriveStations,
      leaveTimeStart,
      leaveTimeEnd,
      arriveTimeStart,
      arriveTimeEnd
    ]
  );

  return (
    <div className='bottom'>
      <div className='bottom-filters'>
        <span className='item' onClick={() => toggleOrderType()}>
          <i className='icon'>&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早 → 晚' : '耗时 短 → 长'}
        </span>
        <span
          className={['item', isHighSpeed ? 'item-on' : ''].filter(Boolean).join(' ')}
          onClick={() => toggleHighSpeed()}>
          <i className='icon'>{isHighSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁/动车
        </span>
        <span
          className={['item', hasTicket ? 'item-on' : ''].filter(Boolean).join(' ')}
          onClick={() => toggleHasTicket()}>
          <i className='icon'>{hasTicket ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={['item', (isFiltersActive || !noChecked)? 'item-on' : ''].filter(Boolean).join(' ')}
          onClick={() => toggleFiltersActive()}>
          <i className='icon'>{noChecked ? '\uf0f7' : '\uf446'}</i>
          综合筛选
        </span>
      </div>
      {isFiltersActive && (
        <FilterModal
          toggleFiltersActive={toggleFiltersActive}
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          leaveStations={leaveStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedLeaveStations={checkedLeaveStations}
          checkedArriveStations={checkedArriveStations}
          leaveTimeStart={leaveTimeStart}
          leaveTimeEnd={leaveTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedLeaveStations={setCheckedLeaveStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setLeaveTimeStart={setLeaveTimeStart}
          setLeaveTimeEnd={setLeaveTimeEnd}
          setArriveTimeStart={setArriveTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
        />
      )}
    </div>
  );
}
Filter.propTypes = {
  orderType: PropTypes.number.isRequired,
  isHighSpeed: PropTypes.bool.isRequired,
  hasTicket: PropTypes.bool.isRequired,
  isFiltersActive: PropTypes.bool.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleHasTicket: PropTypes.func.isRequired,
  toggleFiltersActive: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  leaveStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedLeaveStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  leaveTimeStart: PropTypes.number.isRequired,
  leaveTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedLeaveStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setLeaveTimeStart: PropTypes.func.isRequired,
  setLeaveTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired
};

export default Filter;
