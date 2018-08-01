const send = (data, method='POST', path, headerRequired=true) => {
    const url = "http://127.0.0.1:5000"
    var headers = {'Content-Type': 'application/json'}
    const access_token = localStorage.getItem('hb_access_token')
    if (!['undefined', null].includes(access_token) && headerRequired){
        // console.log(">>>" +access_token)
        const token = 'Bearer ' + access_token
        headers = Object.assign({}, {'Authorization': token})
    }
  
    const myRequest = new Request(url + path, {
      method: method, 
      body: JSON.stringify(data),
      headers: headers
        })
  
    return fetch(myRequest)
  }

export default send;
