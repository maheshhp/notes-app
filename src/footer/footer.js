import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <a href="#about">{this.props.footerText}</a>
      </div>
    );
  }
}

Footer.defaultProps = {
  footerText: 'About Us',
};

Footer.propTypes = {
  footerText: PropTypes.string,
};

export default Footer;
