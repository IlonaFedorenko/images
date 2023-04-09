import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './Section.module.css';

export class Section extends Component {
  render() {
    return <section className={style.Section}>{this.props.children}</section>;
  }
}

Section.propTypes = {
  children: PropTypes.node,
};
