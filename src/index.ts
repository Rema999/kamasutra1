import express from 'express'

const app = express()
const port = process.env.PORT || 3003

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND: 404,
}

const jsonBodyMiddleWare = express.json()
app.use(jsonBodyMiddleWare)
const db = {
    courses: [
        {id: 1, title: "courses1"},
        {id: 2, title: "courses2"},
        {id: 3, title: "courses31"},
        {id: 4, title: "courses4"},
    ],
}
app.get('/', (req, res) => {
    res.json({request: 'Hello World!!!!'})
})

app.get('/courses', (req, res) => {
    if (req.query.title) {
        res.json(db.courses.filter(course => course.title.includes(req.query.title as string)));
        return
    }
    res.json(db.courses)
})

app.get('/courses/:id', (req, res) => {
    const currentCourse = db.courses.find(course => course.id === +req.params.id)

    if (!currentCourse) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }

    res.json(currentCourse)
})

app.put('/courses/:id', (req, res) => {
    const currentCourse = db.courses.find(course => course.id === +req.params.id)

    if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND);
        return;
    }
    if (currentCourse) {
        currentCourse.title = req.body.title
    }

    res.json({currentCourse})
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(course => course.id !== +req.params.id)

    // if (!currentCourse) {
    //     res.sendStatus(HTTP_STATUSES.NOT_FOUND);
    //     return;
    // }

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.post('/courses', (req, res) => {
    const newCourses = {
        id: +(new Date()),
        title: req.body?.title || "",
    }

    db.courses.push(newCourses)
    res.status(HTTP_STATUSES.CREATED_201).json(newCourses)
})


app.get('/samurais', (req, res) => {
    res.send('Hello Samurais!!!!')
})

app.post('/samurais', (req, res) => {
    res.send('We have created  Samurais!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// fetch("http://localhost:3003/courses", {
//     method: "get",
//     headers: {'content-type': 'application/json'}
// }).then(res => res.json()).then(res => console.log(res))

// fetch("http://localhost:3003/courses", {
//     method: "POST",
//     body: JSON.stringify({title: "new courses"}),
//     headers: {'content-type': 'application/json'}
// }).then(res => res.json()).then(res => console.log(res))