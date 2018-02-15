import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import NoteTitle from './noteTitle/NoteTitle';
import NoteText from './noteText/NoteText';
import SaveOptions from './saveOptions/SaveOptions';
import './App.css';

class App extends Component {
  state = {
    chars_left: 10,
    maxChar: 10,
    noteTitle: '',
    noteText: '',
    savedNotes: [],
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
  saveNote = () => {
    this.setState({
      savedNotes: [...this.state.savedNotes,
        {
          noteTitle: this.state.noteTitle,
          noteText: this.state.noteText,
        },
      ],
      noteTitle: '',
      noteText: '',
      chars_left: this.state.maxChar,
    });
  }
  render() {
    console.log(this.state.savedNotes);
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
          footerText="About Us"
        />
      </div>
    );
  }
}

export default App;
