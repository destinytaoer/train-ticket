import React, { memo, useState, useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';

import './Candidate.css';
import { TrainContext } from '../context';

const Channel = memo(function Channel(props) {
  const { name, desc, type } = props;

  const { trainNumber, leaveStation, arriveStation, leaveDate } = useContext(TrainContext);

  const url = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('leaveStation', leaveStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(leaveDate).format('YYYY-MM-DD'))
      .toString();
  }, [type, trainNumber, leaveStation, arriveStation, leaveDate]);

  return (
    <div className='channel'>
      <div className='middle'>
        <div className='name'>{name}</div>
        <div className='desc'>{desc}</div>
      </div>
      <a href={url} className='buy-wrapper'>
        <div className='buy'>买票</div>
      </a>
    </div>
  );
});
Channel.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

const Seat = memo(function Seat(props) {
  const { type, priceMsg, ticketsLeft, channels, expanded, toggle, index } = props;

  return (
    <li>
      <div className='bar' onClick={() => toggle(index)}>
        <span className='seat'>{type}</span>
        <span className='price'>
          <i>$</i>
          {priceMsg}
        </span>
        <span className='btn'>{expanded ? '收起' : '预定'}</span>
        <span className='num'>{ticketsLeft}</span>
      </div>
      <div className='channels' style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}>
        {channels.map(channel => (
          <Channel key={channel.name} {...channel} type={type} />
        ))}
      </div>
    </li>
  );
});
Seat.propTypes = {
  type: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  channels: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

const Candidate = memo(function Candidate(props) {
  const { tickets } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleToggle = useCallback(
    index => {
      setExpandedIndex(index === expandedIndex ? -1 : index);
    },
    [expandedIndex]
  );
  return (
    <div className='candidate'>
      <ul>
        {tickets.map((ticket, index) => {
          return (
            <Seat
              key={ticket.type}
              {...ticket}
              expanded={expandedIndex === index}
              toggle={handleToggle}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
});
Candidate.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default Candidate;
