import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Link to={this.props.footerLink}>
          <p className="FooterButton" >
            {this.props.footerText}
          </p>
        </Link>
      </div>
    );
  }
}

Footer.defaultProps = {
  footerText: 'About Us',
  footerLink: '/',
};

Footer.propTypes = {
  footerText: PropTypes.string,
  footerLink: PropTypes.string,
};

export default Footer;
