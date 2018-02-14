import React, { Component } from 'react';
import './saveOptions.css';

class SaveOptions extends Component {
  render() {
    return (
      <div className="SaveOptions">
        <div>
          <div className="SaveText">Save</div>
          <div className="CharCount">{this.props.charCount} characters left</div>
        </div>
      </div>
    );
  }
}

export default SaveOptions;
