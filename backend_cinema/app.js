import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import nodemailer from 'nodemailer'
import { uid } from 'uid'
import "./config/config.js"

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
    // const resID = req.body.resID

    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }

        const reservations = JSON.parse(data)
        const index = reservations.findIndex((reservation) => reservation.seat === seat)

        if (reserved !== undefined) {
            reservations[index].reserved = reserved
            // resID = uid()
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

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

app.post('/api/ownermail', (req, res) => {
    const message = {
        from: 'thisproject@me.com',
        to: 'owner@cinema.com',
        subject: 'new reservation received',
        text: `Hallo du wunderbarer Mensch, du hast gerade wieder ${req.body.price} Umsatz gemacht.Lass die Korken knallen.`,
        html: `<p style="color:purple;">${req.body.text}</p>`
    }

    transport.sendMail(message, (err, info) => {
        console.log(info)
        if (err) return res.status(500).json({ message: err })
        return res.status(200).json({ message: 'good to go' })
    })
})

app.listen(PORT, () => console.log('running on port', PORT))