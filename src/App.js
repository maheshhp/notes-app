import React, { Component } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import NoteTitle from './noteTitle/noteTitle';
import NoteText from './noteText/noteText';
import SaveOptions from './saveOptions/saveOptions';
import './App.css';

class App extends Component {
  state = {
    chars_left: 10,
    max_char: 10,
  }
  handleCharCount = (charCount) => {
    const maxChar = this.state.max_char;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <NoteTitle />
        <NoteText countUpdater={this.handleCharCount} getCharsLeft={this.state.chars_left} getMaxChars={this.state.max_char} />
        <SaveOptions charCount={this.state.chars_left} />
        <Footer />
      </div>
    );
  }
}

export default App;
