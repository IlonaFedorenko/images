import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.ButtonLoadMore} onClick={onLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
