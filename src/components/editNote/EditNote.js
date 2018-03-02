import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveAction } from '../../redux/actions';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import NoteTitle from '../noteTitle/NoteTitle';
import NoteText from '../noteText/NoteText';
import SaveOptions from '../saveOptions/SaveOptions';
import './editNote.css';

class NewNote extends Component {
  state = {
    chars_left: 10,
    maxChar: 10,
    noteTitle: '',
    noteText: '',
    noteKey: 0,
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({
      noteKey: this.props.savedNotes[params.noteKey].noteKey,
      chars_left: 10 - this.props.savedNotes[params.noteKey].noteText.length,
      noteTitle: this.props.savedNotes[params.noteKey].noteTitle,
      noteText: this.props.savedNotes[params.noteKey].noteText,
    });
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
      noteKey: newSavedNotes.length + 1,
    });
    this.props.history.push('/');
  }

  editNote = (noteKey) => {
    const noteData = this.props.savedNotes[noteKey];
    this.setState({
      noteText: noteData.noteText,
      noteTitle: noteData.noteTitle,
      noteKey: noteData.noteKey,
    });
  }

  render() {
    return (
      <div className="EditNote">
        <Header
          headingText="Start taking notes"
        />
        <NoteTitle
          noteTitle="Note Title"
          placeHolder="Please type your note title"
          value={this.state.noteTitle}
          titleValue={this.saveTitle}
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
}

NewNote.propTypes = {
  savedNotes: PropTypes.array,
  saveNote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);
