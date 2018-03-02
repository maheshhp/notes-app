import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { saveAction } from './redux/actions';
import SavedNotes from './components/savedNotes/SavedNotes';
import EditNote from './components/editNote/EditNote';
import SelectOption from './components/selectOption/SelectOption';
import NewNote from './components/newNote/NewNote';

import './App.css';

class App extends Component {
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
        this.props.saveNote(jsonRes.notes);
      });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={SelectOption} />
          <Route path="/new" component={NewNote} />
          <Route path="/saved" component={SavedNotes} />
          <Route path="/edit/:noteKey" component={EditNote} />
        </Switch>
      </div>);
  }
}

App.propTypes = {
  saveNote: PropTypes.func,
};

App.defaultProps = {
  saveNote: () => {},
};

const mapStateToProps = state => ({
  savedNotes: state.savedNotes,
});

const mapDispatchToProps = dispatch => ({
  saveNote: noteData => dispatch(saveAction(noteData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
