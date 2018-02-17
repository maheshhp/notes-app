import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <button onClick={this.props.switchDisplay} className="FooterButton" >
          {this.props.footerText}
        </button>
      </div>
    );
  }
}

Footer.defaultProps = {
  footerText: 'About Us',
  switchDisplay: () => {},
};

Footer.propTypes = {
  footerText: PropTypes.string,
  switchDisplay: PropTypes.func,
};

export default Footer;
