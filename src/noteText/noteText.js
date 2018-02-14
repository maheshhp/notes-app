import React, { Component } from 'react';
import './noteText.css';


class NoteText extends Component {
  handleCharCount = (event) => {
    const charCount = event.target.value.length;
    this.props.countUpdater(charCount);
  }
  render() {
    return (
      <div className="NoteText">
        <div>
          <div className="HelpText">Please type your note below</div>
        </div>
        <div>
          <textarea
            id="note-content"
            placeholder="Please enter note text"
            className={this.props.getCharsLeft === 0 ? 'NoteTextAreaRed' : 'NoteTextArea'}
            maxLength={this.props.getMaxChars}
            onChange={this.handleCharCount}
          />
        </div>
      </div>
    );
  }
}

export default NoteText;
