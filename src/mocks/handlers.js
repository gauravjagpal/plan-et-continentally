import { rest } from "msw"

const baseURL = 'https://drf-api-project-5-47dcc9e35444.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`)
]