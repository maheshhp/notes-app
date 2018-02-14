import React, { Component } from 'react';
import './noteTitle.css';

class NoteTitle extends Component {
  render() {
    return (
      <div className="NoteTitle">
        <div>
          <div className="TitleText">Note Title</div>
          <button>en</button>
        </div>
        <div>
          <input type="text" id="note-title" placeholder="Please enter note title" />
        </div>
      </div>
    );
  }
}

export default NoteTitle;
