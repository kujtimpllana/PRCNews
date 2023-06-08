import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getNews = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM news WHERE category=?" : "SELECT * FROM news"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

export const getSingleNew = (req, res) => {
    const q = "SELECT `fullname`, `title`, `desc`, `img`, `profile_photo`, `category`, `date` FROM users as u JOIN news as n ON u.id=n.uid WHERE n.id = ?"
    //req.params.id comes from ':id' endpoint
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}


export const addNew = (req, res) => {
    res.json("test new controller")
}

export const deleteNew = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authorized!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "DELETE FROM news WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your post!")

            return res.json("Post has been deleted!")
        })
    })
}

export const updateNew = (req, res) => {
    res.json("test new controller")
}