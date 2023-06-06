import { db } from "../db.js"

export const getNews = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM news WHERE category=?" : "SELECT * FROM news"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const getSingleNew = (req, res) => {
    const q = "SELECT `fullname`, `title`, `desc`, `img`, `profile_photo`, `category`, `date` FROM users as u JOIN news as n ON u.id=n.uid WHERE n.id = ?"
    //req.params.id comes from ':id' endpoint
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err)

        return res.status(200).json(data[0])
    })
}


export const addNew = (req, res) => {
    res.json("test new controller")
}

export const deleteNew = (req, res) => {
    res.json("test new controller")
}

export const updateNew = (req, res) => {
    res.json("test new controller")
}