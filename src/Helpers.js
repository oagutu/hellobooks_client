/** Contains functions that are used throughout the app */
import { NotificationManager } from 'react-notifications';

/**
 * Create and send api fetch request.
 * returns promise object.
 *
 * @param {*} data
 * @param {string} [method='POST']
 * @param {*} path
 * @param {boolean} [headerRequired=true]
 * @returns
 */
const send = (data, method = 'POST', path, headerRequired = true) => {
  const url = ' https://fast-stream-12738.herokuapp.com/';
  let headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify(data);
  const accessToken = localStorage.getItem('hb_access_token');
  if (!['undefined', null].includes(accessToken) && headerRequired) {
    const token = `Bearer ${accessToken}`;
    headers = Object.assign({}, headers, { Authorization: token });
  }

  const methods = ['POST', 'PUT'];
  const myRequest = methods.includes(method) ? new Request(url + path, { method, body, headers })
    : new Request(url + path, { method, headers });

  return fetch(myRequest);
};

/**
 * Logout user in the case of session expiry.
 *
 * @param {*} { history }
 */
const sessionExpire = ({ history }) => {
  localStorage.clear();
  history.push({ pathname: '/' });
  NotificationManager.info('Session has expired. Login required,', 'session expired:');
};

export default send;
export { sessionExpire };
