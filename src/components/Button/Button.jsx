import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Button.module.css';

export class Button extends Component {
  render() {
    const { label, handleLoadMore } = this.props;
    return (
      <button
        type="button"
        className={style.ButtonLoadMore}
        onClick={handleLoadMore}
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};