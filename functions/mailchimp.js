const axios = require('axios')
require('dotenv').config()

exports.handler = (event, context, callback) => {
  console.log('MAILCHIMP')
  const payload = JSON.parse(event.body)
  console.log('payload', payload)

  if (event.httpMethod.toLowerCase() !== 'post') {
    return {
      statusCode: 400,
      body: 'Wrong HTTP method. Only accepts POST.',
    }
  }

  if (!payload.body || !payload.body.email) {
    return {
      statusCode: 400,
      body: 'Email required',
    }
  }
  return axios
    .post(
      `https://${
        process.env.GRIDSOME_MAILCHIMP_REGION
      }.api.mailchimp.com/3.0/lists/${
        process.env.GRIDSOME_MAILCHIMP_AUDIENCE_ID
      }/members`,
      {
        email_address: payload.body.email,
        status: 'subscribed',
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `apikey ${process.env.GRIDSOME_MAILCHIMP_API_KEY}`,
        },
      }
    )
    .then(function(response) {
      // handle success
      return {
        statusCode: 200,
        body: 'Subscriber added successfully',
      }
    })
    .catch(function(error) {
      // handle error
      console.error('ERROR ===>', error.response.data)
      return {
        statusCode: error.response.data.status,
        body: error.response.data.errors || error.response.data.detail,
      }
    })
}
