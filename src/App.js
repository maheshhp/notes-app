import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import NoteTitle from './noteTitle/NoteTitle';
import NoteText from './noteText/NoteText';
import SaveOptions from './saveOptions/SaveOptions';
import NoteCard from './noteCard/NoteCard';
import './App.css';

class App extends Component {
  state = {
    chars_left: 10,
    maxChar: 10,
    noteTitle: '',
    noteText: '',
    savedNotes: [],
    dispStatus: 1,
    noteKey: 0,
  }
  handleCharCount = (charCount) => {
    const charLength = this.state.maxChar - charCount;
    this.setState({ chars_left: charLength });
  }
  saveText = (text) => {
    this.setState({ noteText: text });
  }
  saveTitle = (title) => {
    this.setState({ noteTitle: title });
  }
  changeDisplay = (dispKey) => {
    this.setState({ dispStatus: dispKey });
  }
  saveNote = () => {
    const currentKey = this.state.noteKey;
    const newSavedNotes = this.state.savedNotes;
    newSavedNotes[currentKey] = {
      noteKey: this.state.noteKey,
      noteTitle: this.state.noteTitle,
      noteText: this.state.noteText,
    };
    this.setState({
      savedNotes: newSavedNotes,
      noteTitle: '',
      noteText: '',
      chars_left: this.state.maxChar,
      dispStatus: 0,
      noteKey: newSavedNotes.length + 1,
    });
  }
  editNote = (noteKey) => {
    const noteData = this.state.savedNotes[noteKey];
    this.setState({
      noteText: noteData.noteText,
      noteTitle: noteData.noteText,
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
            buttonText="en"
            titleValue={this.saveTitle}
            value={this.state.noteTitle}
          />
          <NoteText
            countUpdater={this.handleCharCount}
            getCharsLeft={this.state.chars_left}
            getMaxChars={this.state.maxChar}
            placeHolder="Please enter note here"
            helpText="Please type your note below"
            value={this.state.noteText}
            noteValue={this.saveText}
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
    const savedNoteItems = this.state.savedNotes.map(note => (
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

export default App;
