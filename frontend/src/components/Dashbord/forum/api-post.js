const create = async (params, credentials, post) => {
    try {
      let response = await fetch('http://localhost/5000/pub'+ params.userId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        },
        body: post
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }