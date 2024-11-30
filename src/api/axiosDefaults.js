import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-project-5-47dcc9e35444.herokuapp.com/'
axios.defaults.headers.post['Content Type']= 'multipart/form-data'
axios.defaults.withCredentials = true