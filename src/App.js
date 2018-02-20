import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAction, editAction } from './redux/actions';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NoteTitle from './components/noteTitle/NoteTitle';
import NoteText from './components/noteText/NoteText';
import SaveOptions from './components/saveOptions/SaveOptions';
import NoteCard from './components/noteCard/NoteCard';
import './App.css';

class App extends Component {
  state = {
    chars_left: 10,
    maxChar: 10,
    dispStatus: 1,
    noteTitle: '',
    noteText: '',
    noteKey: 0,
  }
  componentDidMount() {
    fetch('/notes/all')
      .then((response) => {
        if (!response.ok) {
          console.log('Network request failed');
        }
        return response;
      })
      .then(res => res.json())
      .then((jsonRes) => {
        this.setState({
          noteTitle: '',
          noteText: '',
          chars_left: this.state.maxChar,
          dispStatus: 1,
          noteKey: jsonRes.notes.length,
        });
        this.props.saveNote(jsonRes.notes);
      }, () => {
        this.setState({
          noteTitle: '',
          noteText: '',
          chars_left: this.state.maxChar,
          dispStatus: 1,
          noteKey: 1,
        });
      });
  }
  handleCharCount = (charCount) => {
    const charLength = this.state.maxChar - charCount;
    this.setState({ chars_left: charLength });
  }
  syncNotesWithDB = () => {
    fetch('/notes/update', {
      method: 'POST',
      body: JSON.stringify(this.props.savedNotes),
    }).then((response) => {
      console.log(response);
    });
  }
  changeDisplay = (dispKey) => {
    this.setState({ dispStatus: dispKey });
  }
  saveText = (text) => {
    this.setState({ noteText: text });
  }
  saveTitle = (title) => {
    this.setState({ noteTitle: title });
  }
  saveNote = () => {
    const currentKey = this.state.noteKey;
    const newSavedNotes = this.props.savedNotes;
    newSavedNotes[currentKey] = {
      noteKey: this.state.noteKey,
      noteTitle: this.state.noteTitle,
      noteText: this.state.noteText,
    };
    this.props.saveNote(newSavedNotes);
    this.setState({
      noteTitle: '',
      noteText: '',
      chars_left: this.state.maxChar,
      dispStatus: 0,
      noteKey: newSavedNotes.length + 1,
    });
  }
  editNote = (noteKey) => {
    const noteData = this.props.savedNotes[noteKey];
    this.setState({
      noteText: noteData.noteText,
      noteTitle: noteData.noteTitle,
      noteKey: noteData.noteKey,
    }, this.changeDisplay(1));
  }
  render() {
    if (this.state.dispStatus) {
      return (
        <div className="App">
          <Header
            headingText="Start taking notes"
          />
          <NoteTitle
            noteTitle="Note Title"
            placeHolder="Please type your note title"
            buttonText="Sync"
            value={this.state.noteTitle}
            titleValue={this.saveTitle}
            syncFunction={this.syncNotesWithDB}
          />
          <NoteText
            countUpdater={this.handleCharCount}
            getCharsLeft={this.state.chars_left}
            getMaxChars={this.state.maxChar}
            value={this.state.noteText}
            noteValue={this.saveText}
            placeHolder="Please enter note here"
            helpText="Please type your note below"
          />
          <SaveOptions
            charCount={this.state.chars_left}
            saveTextString="Save"
            saveNoteFunction={this.saveNote}
          />
          <Footer
            footerText="View Saved Notes"
            switchDisplay={() => { this.changeDisplay(0); }}
          />
        </div>
      );
    }
    const savedNoteItems = this.props.savedNotes.map(note => (
      <NoteCard
        key={note.noteKey}
        noteId={note.noteKey}
        noteTitle={note.noteTitle}
        noteText={note.noteText}
        editHandler={this.editNote}
      />));
    return (
      <div className="App">
        <Header
          headingText="Note History"
        />
        {savedNoteItems}
        <button
          className="CreateNoteButton"
          onClick={() => {
          this.setState({
            dispStatus: 1,
          });
        }}
        >
        Create Another Note
        </button>
        <Footer
          footerText="Back to home"
          switchDisplay={() => { this.changeDisplay(1); }}
        />
      </div>
    );
  }
}

App.propTypes = {
  savedNotes: PropTypes.array,
  saveNote: PropTypes.func,
};

App.defaultProps = {
  savedNotes: [],
  saveNote: () => {},
};

const mapStateToProps = state => ({
  savedNotes: state.savedNotes,
});

const mapDispatchToProps = dispatch => ({
  saveNote: noteData => dispatch(saveAction(noteData)),
  editNote: noteData => dispatch(editAction(noteData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
