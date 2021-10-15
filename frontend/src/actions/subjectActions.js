import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';

export const addSubject = (payload) => async () => {
  console.log('Payload inside register ', payload)
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/subjects/',
      payload,
      config
    )

  } catch (error) {
    console.log(error)
  }
}
