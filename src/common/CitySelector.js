import React, {useState, useEffect, useMemo, memo} from 'react';
import PropTypes from 'prop-types';

import './CitySelector.css';
import { useCallback } from 'react';

// 每个城市
const CityItem = memo(function CityItem(props) {
  const {
    name, handleSelect
  } = props;

  return (
    <li className="city-li" onClick={() => handleSelect(name)}>
      {name}
    </li>
  )
})
CityItem.propTypes = {
  name: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired
}

// 每个城市拼音分组
const CitySection = memo(function CitySection(props) {
  const { title, cities=[], handleSelect } = props;
  return (
    <ul className="city-ul">
      <li className="city-li" key={title} data-cate={title}>{title}</li>
      {
        cities.map(city => {
          return <CityItem key={city.name} name={city.name} handleSelect={handleSelect} />
        })
      }
    </ul>
  )
})
CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  handleSelect: PropTypes.func.isRequired
}

// 右侧定位字母
const AlphaIndex = memo(function AlphaIndex(props) {
  const {
    alpha,
    handleClick
  } = props;
  return (
    <i className="city-index-item" onClick={() => handleClick(alpha)}>
      {alpha}
    </i>
  )
})
AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

// 城市列表
const CityList = memo(function CityList(props) {
  const { sections, handleSelect, toAlpha } = props;

  const alphabet = useMemo(() => {
    return Array.from(new Array(26), (ele, index) => {
      return String.fromCharCode(65 + index);
    })
  }, []);

  return (
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map(section => {
            return (
              <CitySection
                key={section.title}
                title={section.title}
                cities={section.citys}
                handleSelect={handleSelect}
              />
            )
          })
        }
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
            return <AlphaIndex key={alpha} alpha={alpha} handleClick={toAlpha} />
        }
        )}
      </div>
    </div>
  )
})
CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
}

const SuggestItem = memo(function SuggestItem(props) {
  const { name, handleClick } = props;

  return (
    <li className="city-suggest-li" onClick={() => handleClick}>
      {name}
    </li>
  )
})
SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const Suggest = memo(function Suggest(props) {
  const { searchKey, handleSelect } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        if (sKey === searchKey) {
          setResult(result)
        }
      })
  }, [searchKey]);

  const fallBackResult = useMemo(() => {
    return result.length ? result : [{ display: searchKey }]
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map(item => {
            return <SuggestItem key={item.display} name={item.display} handleClick={handleSelect}/>
          })
        }
      </ul>
    </div>
  )
})
Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

const CitySelector = memo(function CitySelector(props) {
  const { show, cityData, isLoading, handleBack, fetchCityData,handleSelect } = props;

  const [searchKey, setSearchKey] = useState('');

  const key = useMemo(() => {
    return searchKey.trim();
  }, [searchKey]);

  useEffect(() => {
    if (!show || cityData) return;
    fetchCityData();
  }, [show, cityData, fetchCityData]);

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`)
      .scrollIntoView();
  }, []);

  const outputCitySections = useCallback(() => {
    if (isLoading) {
      return <div>loading</div>
    }
    if (cityData) {
      return <CityList sections={cityData.cityList} handleSelect={handleSelect} toAlpha={toAlpha}/>
    }
    return <div>error</div>
  }, [isLoading, cityData, handleSelect, toAlpha])

  return (
    <div className={['city-selector', (!show) && 'hidden'].filter(Boolean).join(' ')}>
      <div className="city-search">
        <div className="search-back" onClick={()=> handleBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市/车站的中文或拼音"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={['search-clean', key.length === 0 && 'hidden'].filter(Boolean).join(' ')}
          onClick={() => setSearchKey('')}
        >&#xf063;</i>
      </div>
      {
        Boolean(key) && <Suggest searchKey={key} handleSelect=
          {handleSelect}/>
      }
      {outputCitySections()}
    </div>
  )
})
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired
}
export default CitySelector;