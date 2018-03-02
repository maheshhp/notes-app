import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { saveAction } from '../../redux/actions';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NoteCard from '../noteCard/NoteCard';
import './savedNotes.css';

class NewNote extends Component {
  // editNote = (noteKey) => {
  //   const noteData = this.props.savedNotes[noteKey];
  //   this.setState({
  //     noteText: noteData.noteText,
  //     noteTitle: noteData.noteTitle,
  //     noteKey: noteData.noteKey,
  //   });
  // }

  render() {
    const savedNoteItems = this.props.savedNotes.map(note => (
      <NoteCard
        key={note.noteKey}
        noteId={note.noteKey}
        noteTitle={note.noteTitle}
        noteText={note.noteText}
        editHandler={this.editNote}
      />));
    return (
      <div className="SavedNotes">
        <Header
          headingText="Note History"
        />
        <div className="SavedNotesContainer">
          {savedNoteItems}
        </div>
        <p className="BackToHomeLink"><Link to="/">Home</Link></p>
        <Footer
          footerText="About Us"
        />
      </div>
    );
  }
}

NewNote.propTypes = {
  savedNotes: PropTypes.array,
};

NewNote.defaultProps = {
  savedNotes: [],
};

const mapStateToProps = state => ({
  savedNotes: state.savedNotes,
});

const mapDispatchToProps = dispatch => ({
  saveNote: noteData => dispatch(saveAction(noteData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewNote));
