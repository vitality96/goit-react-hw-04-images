import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <div style={{display: "flex", justifyContent: "center" }}>
      <button type="button" onClick={loadMore} className={s.Button}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
