import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-9aa61-default-rtdb.europe-west1.firebasedatabase.app/'
})