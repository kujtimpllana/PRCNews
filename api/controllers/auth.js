import { db } from "../db.js"
import bcrypt from "bcryptjs"

export const register = (req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("Invalid values, please try again!")

        //password hashing
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users(`fullname`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.fullname,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err,data) => {
            if(err) return res.json(err)
            return res.status(200).json("User has been created.")
        })
    })
}

export const login = (req, res) => {
    
}

export const logout = (req, res) => {
    
}