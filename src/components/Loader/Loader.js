import { HollowDotsSpinner } from 'react-epic-spinners';
import PropTypes from 'prop-types';
import s from './Loader.module.css';


const Loader = ({ color, size }) => {
  return (
    <div className={s.Loader}>
      <HollowDotsSpinner color={color} size={size} />
    </div>
  );
};

Loader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Loader;
