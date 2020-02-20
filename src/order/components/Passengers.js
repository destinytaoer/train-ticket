import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../common/fp';

import './Passengers.css';

const Passenger = memo(function Passenger(props) {
  const {
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    handleRemove,
    handleUpdate,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu
  } = props;

  const isAdult = useMemo(() => ticketType === 'adult', [ticketType]);

  const [curName, setCurName] = useState(name);
  const [curLicenceNo, setCurLicenceNo] = useState(licenceNo);
  const [curBirthday, setCurBirthday] = useState(birthday);

  const { updateName, updateLicenceNo, updateBirthday } = useMemo(() => {
    return {
      updateName: debounce(
        value => handleUpdate(id, { name: value }),
        value => setCurName(value)
      ),
      updateLicenceNo: debounce(
        value => handleUpdate(id, { licenceNo: value }),
        value => setCurLicenceNo(value)
      ),
      updateBirthday: debounce(
        value => handleUpdate(id, { birthday: value }),
        value => setCurBirthday(value)
      )
    };
  }, [id, handleUpdate]);

  return (
    <li className='passenger'>
      <i className='delete' onClick={() => handleRemove(id)}>
        －
      </i>
      <ol className='items'>
        <li className='item'>
          <label className='label name'>姓名</label>
          <input
            type='text'
            className='input name'
            placeholder='乘客姓名'
            value={curName}
            onChange={e => updateName(e.target.value)}
          />
          <label className='ticket-type' onClick={() => showTicketTypeMenu(id)}>
            {ticketType === 'adult' ? '成人票' : '儿童票'}
          </label>
        </li>
        {isAdult && (
          <li className='item'>
            <label className='label licenceNo'>身份证</label>
            <input
              type='text'
              className='input licenceNo'
              placeholder='乘客身份证号'
              value={curLicenceNo}
              onChange={e => updateLicenceNo(e.target.value)}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label gender'>性别</label>
            <input
              type='text'
              className='input gender'
              placeholder='请选择'
              value={gender === 'male' ? '男' : gender === 'female' ? '女' : ''}
              readOnly
              onClick={() => showGenderMenu(id)}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item'>
            <label className='label birthday'>生日</label>
            <input
              type='text'
              className='input birthday'
              placeholder='如: 1995年1月5日, 则填写19950105'
              value={curBirthday}
              onChange={e => updateBirthday(e.target.value)}
            />
          </li>
        )}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label followAdult'>同行成人</label>
            <input
              type='text'
              className='input followAdult'
              placeholder='请选择'
              value={followAdult}
              readOnly
              onClick={() => showFollowAdultMenu(id)}
            />
          </li>
        )}
      </ol>
    </li>
  );
});
Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.number,
  ticketType: PropTypes.string.isRequired,
  licenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired
};

const Passengers = memo(function Passengers(props) {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu
  } = props;

  return (
    <div className='passengers'>
      <ul>
        {passengers.map(passenger => {
          return (
            <Passenger
              key={passenger.id}
              {...passenger}
              handleRemove={removePassenger}
              handleUpdate={updatePassenger}
              showGenderMenu={showGenderMenu}
              showFollowAdultMenu={showFollowAdultMenu}
              showTicketTypeMenu={showTicketTypeMenu}
            />
          );
        })}
      </ul>
      <section className='add'>
        <div className='adult' onClick={() => createAdult()}>
          添加成人
        </div>
        <div className='child' onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  );
});
Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired
};

export default Passengers;
