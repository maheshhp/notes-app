import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        {this.props.headingText}
      </div>
    );
  }
}

Header.propTypes = {
  headingText: PropTypes.string,
};

Header.defaultProps = {
  headingText: 'Start taking notes',
};

export default Header;
