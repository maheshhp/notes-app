import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './saveOptions.css';

class SaveOptions extends Component {
  render() {
    return (
      <div className="SaveOptions">
        <div className="SaveText"><a onClick={this.props.saveNoteFunction}>{this.props.saveTextString}</a></div>
        <div className="CharCount"><p className={this.props.charCount === 0 ? 'CharCountRed' : ''}>{this.props.charCount} characters left</p></div>
      </div>
    );
  }
}

SaveOptions.propTypes = {
  saveTextString: PropTypes.string,
  charCount: PropTypes.number,
  saveNoteFunction: PropTypes.func,
};

SaveOptions.defaultProps = {
  saveTextString: 'Save',
  charCount: 0,
  saveNoteFunction: () => null,
};


export default SaveOptions;
