import React from 'react';
import Input from './Input';
import Button from './Button';

class EditInPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = { changing: false, value: '' };
    this.changeHandlerInternal = this.changeHandlerInternal.bind(this);
    this.saveHandlerInternal = this.saveHandlerInternal.bind(this);
  }

  changeHandlerInternal(event) {
    this.setState({
      changing: true,
      value: event.target.value,
    });
  }

  saveHandlerInternal() {
    this.setState({ changing: false, value: '' });
    this.props.changeHandler(this.state.value);
  }

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Input
          changeHandler={this.changeHandlerInternal}
          value={this.state.value}
          placeholder={this.props.placeholder}
        />
        {this.state.changing && <Button clickHandler={this.saveHandlerInternal}>Сохранить</Button>}
      </div>
    );
  }
}

EditInPlace.propTypes = Input.propTypes;
EditInPlace.defaultProps = Input.defaultProps;

export default EditInPlace;
