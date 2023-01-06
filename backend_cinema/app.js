import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import nodemailer from 'nodemailer'
import "./config/config.js"
import { uid } from 'uid'

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/public', express.static('./public'))

app.get('/reservations', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }
        const reservations = JSON.parse(data)
        console.log(reservations)
        return res.json(reservations)
    })

})

app.get('/empty', (req, res) => {
    fs.readFile('./starterData.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }
        const emptyTheater = JSON.parse(data)
        console.log(emptyTheater)
        return res.json(emptyTheater)
    })

})

app.put('/reserve/:seat', (req, res) => {
    const reserved = req.body.reserved
    const seat = req.params.seat

    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }

        const reservations = JSON.parse(data)
        const index = reservations.findIndex((reservation) => reservation.seat === seat)

        if (reserved !== undefined) {
            reservations[index].reserved = reserved
        }

        fs.writeFile('./data.json', JSON.stringify(reservations), (err) => {
            if (err) {
                return res.status(500).send('could not complete reservation.')
            }
        })

        return res.json(reservations)
    })
})

app.delete('/reservations', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }
        const reservations = JSON.parse(data)
        console.log('pre-delete', reservations)

        while (reservations.length > 0) {
            reservations.pop()
        }
        console.log('deleted from array', reservations)
        fs.writeFile('./data.json', JSON.stringify(reservations), (err) => {
            if (err) {
                return res.status(500).send('could not delete reservations.')
            }
        })
        console.log('post-delete', reservations)
        return res.json(reservations)
    })

})

app.listen(PORT, () => console.log('running on port', PORT))