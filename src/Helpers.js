const send = (data, method = 'POST', path, headerRequired = true) => {
  const url = 'http://127.0.0.1:5000'
  let headers = { 'Content-Type': 'application/json' };
  const accessToken = localStorage.getItem('hb_access_token');
  if (!['undefined', null].includes(accessToken) && headerRequired) {
    // console.log(`>>> ${accessToken}`);
    const token = `Bearer ${accessToken}`;
    headers = Object.assign({}, { Authorization: token });
  }

  const myRequest = new Request(url + path, {
    method,
    body: JSON.stringify(data),
    headers,
  });

  return fetch(myRequest);
};

export default send;
