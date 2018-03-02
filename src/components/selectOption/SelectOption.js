import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Notification } from 'react-notification';

import { saveAction } from '../../redux/actions';
import Header from '../header/Header';
import './selectOption.css';


class SelectOption extends Component {
  state = {
    isNotify: false,
    notifyMsg: '',
  }
  syncNotesWithDB = () => {
    fetch('/notes/update', {
      method: 'POST',
      body: JSON.stringify(this.props.savedNotes),
    }).then((response) => {
      this.setState({
        isNotify: true,
        notifyMsg: 'Sync success',
      });
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <Header headingText="Welcome to notes app" />
        <div className="HomePage">
          <div className="OptionSection">
            <Link to="/new"><button className="OptionButton">New Note</button></Link>
            <Link to="/saved"><button className="OptionButton">Saved Notes</button></Link>
            <button className="OptionButton" onClick={() => this.syncNotesWithDB()}>Sync notes</button>
          </div>
        </div>
        <Notification
          isActive={this.state.isNotify}
          message={this.state.notifyMsg}
          action="Close"
          onClick={() => {
            this.setState({
              isNotify: false,
              notifyMsg: '',
            });
          }}
        />
      </div>
    );
  }
}

SelectOption.propTypes = {
  savedNotes: PropTypes.array,
};

SelectOption.defaultProps = {
  savedNotes: [],
};

const mapStateToProps = state => ({
  savedNotes: state.savedNotes,
});

const mapDispatchToProps = dispatch => ({
  saveNote: noteData => dispatch(saveAction(noteData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectOption));
