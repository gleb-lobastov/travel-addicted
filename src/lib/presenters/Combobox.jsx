import React from 'react';

function Combobox({ onChangeHandler, options = {}, defaultKey }) {
  return (
    <select onChange={onChangeHandler} defaultValue={defaultKey}>
      {Object.keys(options).map(key => (
        <option
          key={key}
          value={key}
        >
          {options[key]}
        </option>
      ))}
    </select>
  );
}

Combobox.propTypes = {
  onChangeHandler: React.PropTypes.func,
  options: React.PropTypes.objectOf(React.PropTypes.string),
  defaultKey: React.PropTypes.string,
};

Combobox.defaultProps = {
  onChangeHandler: undefined,
  defaultKey: undefined,
  options: [],
};

export default Combobox;
