import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './noteCard.css';


class NoteCard extends Component {
  startEdit = (event) => {
    this.props.editHandler(event.target.id);
  }
  render() {
    return (
      <div
        className="NoteCard"
        id={this.props.noteId}
        onClick={this.startEdit}
      >
        <h4 className="CardNoteTitle">{this.props.noteTitle}</h4>
        <p className="CardNoteText">{this.props.noteText}</p>
      </div>
    );
  }
}

NoteCard.propTypes = {
  noteTitle: PropTypes.string,
  noteText: PropTypes.string,
  noteId: PropTypes.number,
  editHandler: PropTypes.func,
};

NoteCard.defaultProps = {
  noteTitle: '',
  noteText: '',
  noteId: 0,
  editHandler: () => {},
};

export default NoteCard;
