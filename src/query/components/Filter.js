import React, {memo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import './Filter.css';
import { ORDER_DEPART } from '../constants';

const Option = memo(function Option(props) {
  const { name, checked, value, toggle } = props;

  return (
    <li className={checked ? 'checked' : ''} onClick={() => toggle(value)}>{name}</li>
  )
})
Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

const Options = memo(function Options(props) {
  const { title, options, checkedMap, update } = props;

  const toggle = useCallback((value) => {
    const newCheckedMap = { ...checkedMap };
    if (value in checkedMap) {
      delete newCheckedMap[value];
    } else {
      newCheckedMap[value] = true;
    }

    update(newCheckedMap);
  }, [checkedMap, update]);

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(option => <Option
            key={option.value}
            {...option}
            checked={option.value in checkedMap}
            toggle={toggle}
          />)
        }
      </ul>
    </div>
  )
});
Options.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
}

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
    setArriveTimeEnd,
  } = props;

  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => ({ ...checkedTicketTypes }));
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => ({ ...checkedTrainTypes }));
  const [localCheckedLeaveStations, setLocalCheckedLeaveStations] = useState(() => ({ ...checkedLeaveStations }));
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => ({ ...checkedArriveStations }));

  const handleReset = useCallback(() => {
    setLocalCheckedTicketTypes({});
    setLocalCheckedTrainTypes({});
    setLocalCheckedLeaveStations({});
    setLocalCheckedArriveStations({});
  }, []);
  const handleSubmit = useCallback(() => {
    setCheckedTicketTypes(localCheckedTicketTypes);
    setCheckedTrainTypes(localCheckedTrainTypes);
    setCheckedLeaveStations(setLocalCheckedLeaveStations);
    setCheckedArriveStations(localCheckedArriveStations);
    toggleFiltersActive();
  }, [
    setCheckedTicketTypes, setCheckedTrainTypes, setCheckedLeaveStations, setCheckedArriveStations, toggleFiltersActive,
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    setLocalCheckedLeaveStations,
    localCheckedArriveStations,
  ]);

  const optionsGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes
    },
    {
      title: '车次类型',
      options:  trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes
    },
    {
      title: '出发车站',
      options: leaveStations,
      checkedMap: localCheckedLeaveStations,
      update: setLocalCheckedLeaveStations
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations
    },
  ]

  return (
    <div className="filter-modal">
      <div className="filter-dialog">
        <div className="filter-dialog-content">
          <div className="title">
            <span className="reset" onClick={() => handleReset()}>重置</span>
            <span className="ok" onClick={() => handleSubmit()}>确定</span>
          </div>
          <div className="options">
            {
              optionsGroup.map(options => <Options {...options} key={options.title} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
});
FilterModal.propTypes = {
  toggleFiltersActive: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  leaveStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes:PropTypes.object.isRequired,
  checkedTrainTypes:PropTypes.object.isRequired,
  checkedLeaveStations:PropTypes.object.isRequired,
  checkedArriveStations:PropTypes.object.isRequired,
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
  setArriveTimeEnd: PropTypes.func.isRequired,
}
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
    setArriveTimeEnd,
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={() => toggleOrderType()}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早 → 晚' : '耗时 短 → 长'}
        </span>
        <span className={["item", isHighSpeed ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleHighSpeed()}>
          <i className="icon">{isHighSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁/动车
        </span>
        <span className={["item", hasTicket ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleHasTicket()}>
          <i className="icon">{hasTicket ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span className={["item", isFiltersActive ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleFiltersActive()}>
          <i className="icon">{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
      {
        isFiltersActive && (
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
        )
      }
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
  checkedTicketTypes:PropTypes.object.isRequired,
  checkedTrainTypes:PropTypes.object.isRequired,
  checkedLeaveStations:PropTypes.object.isRequired,
  checkedArriveStations:PropTypes.object.isRequired,
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
  setArriveTimeEnd: PropTypes.func.isRequired,
}

export default Filter