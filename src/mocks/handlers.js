import { rest } from "msw"

const baseURL = 'https://drf-api-project-5-47dcc9e35444.herokuapp.com/'

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 1,
            "username": "gauravjagpal",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 1,
            "profile_image": "https://res.cloudinary.com/ds7qlwk02/image/upload/v1/media/images/gauravjagpal_dvzh4p"
          }))
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
]