import React from 'react';

function Button({ clickHandler, children }) {
  return (
    <button onClick={clickHandler}> { children } </button>
  );
}

Button.propTypes = {
  children: React.PropTypes.node,
  clickHandler: React.PropTypes.func,
};

Button.defaultProps = {
  children: '',
  clickHandler: undefined,
};

export default Button;
