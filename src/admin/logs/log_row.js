/** Holds the individual book log rows */

import React from 'react';
import PropTypes from 'prop-types';


/**
 * Single log row component
 *
 * @param {*} props
 */
const logRow = (props) => {
  const {
    value, user_id, book_id, timestamp, success, action,
  } = props;
  const recipient_id = user_id || book_id;
  const success_icon = success ? 'fa fa-check' : 'fa fa-close';

  return (
    <tr className="log-row">
      <td value={value}>{value}</td>
      <td value={timestamp}>{timestamp}</td>
      <td value={recipient_id} className="recipient_id">{recipient_id}</td>
      <td value={action}>{action}</td>
      <td value={success} className="user-action-success">
        <i className={success_icon} id="user-action-success" />
      </td>
    </tr>
  );
};

logRow.defaultProps = {
  user_id: null,
  book_id: null,
};

logRow.propTypes = {
  value: PropTypes.number.isRequired,
  user_id: PropTypes.number,
  book_id: PropTypes.number,
  timestamp: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default logRow;
