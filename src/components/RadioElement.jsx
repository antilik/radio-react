import React, { useState, useEffect, useRef } from 'react';

import { radioListSource } from './radioListSource';

import './RadioElement.css';

const RadioElement = () => {
  const [stateOfPlayer, setStateOfPlayer] = useState('stop');
  const [radio, setRadio] = useState(radioListSource[0]);

  const radioElem = useRef(new Audio(radio.src));
  const prevActionState = useRef('notReady');

  const playOnStart = (e) => {
    setStateOfPlayer('play');
    prevActionState.current = 'ready';
  };

  useEffect(() => {
    if (radioElem.current) {
      switch (stateOfPlayer) {
        case 'play':
          radioElem.current.play();
          prevActionState.current = 'play';
          break;
        case 'pause':
        default:
          radioElem.current.pause();
          prevActionState.current = 'pause';
      }
    }
  }, [stateOfPlayer]);

  const setListener = () => {
    radioElem.current.addEventListener('canplaythrough', playOnStart);
  };

  const deleteListener = () => {
    radioElem.current.addEventListener('canplaythrough', playOnStart);
  };

  useEffect(() => {
    setListener();

    return () => {
      deleteListener();
    };
    // eslint-disable-next-line
  }, [radioElem.current]);

  const playPauseHandler = (e) => {
    switch (stateOfPlayer) {
      case 'pause':
      case 'stop':
        setStateOfPlayer('play');
        break;
      case 'play':
      default:
        setStateOfPlayer('pause');
    }
  };
  const listItemClick = (e, index) => {
    radioElem.current.pause();
    radioElem.current = null;
    setStateOfPlayer('stop');
    setRadio(radioListSource[index]);
    radioElem.current = new Audio(radioListSource[index].src);
  };
  return (
    <div className="radioElem__container">
      <h1>RadioElement</h1>
      <h3>Title: {radio.title} </h3>
      <div className="radioElem-controls__container">
        <button className="play-pause__btn" onClick={playPauseHandler}>
          {stateOfPlayer === 'play' ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="radio-list__container">
        <ul className="radio-list">
          {radioListSource.map((el, index) => {
            return (
              <li
                key={index}
                className="radio-list__item"
                onClick={(e) => listItemClick(e, index)}
              >
                <span>{el.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RadioElement;
