async function customPost(url, body, callback) {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(function (response) {
    console.log(response)
    // if (response.ok) {
    //   return response.json();
    // }
    // return Promise.reject(response);
  }).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.error('Something went wrong.', error);
  });
}