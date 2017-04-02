import React from 'react';

function Input(props) {
  return (
    <input
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changeHandler}
    />
  );
}

Input.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  changeHandler: React.PropTypes.func,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  changeHandler: undefined,
};

export default Input;
