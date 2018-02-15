import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './saveOptions.css';

class SaveOptions extends Component {
  render() {
    return (
      <div className="SaveOptions">
        <div>
          <a className="SaveText" href="#save" onClick={this.props.saveNoteFunction}>{this.props.saveTextString}</a>
          <div className="CharCount">{this.props.charCount} characters left</div>
        </div>
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
