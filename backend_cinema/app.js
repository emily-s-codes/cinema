import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import fs from 'fs'
import nodemailer from 'nodemailer'
import { uid } from 'uid'
import "./config/config.js"

const PORT = process.env.PORT
const app = express()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/public', express.static('./public'))

app.get('/empty', (_, res) => {
    fs.readFile('./starterData.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }
        const reservations = JSON.parse(data)
        console.log(reservations)

        fs.writeFile('./data.json', JSON.stringify(reservations), (err) => {
            if (err) {
                return res.status(500).send('could not complete reservation.')
            }
        })
        console.log(reservations)
        return res.json(reservations)
    })
})

// const getCurrentRes = () => {
//     return new Promise((resolve, reject) => {
//         fs.readFile('./data.json', (err, data) => {
//             if (err) reject(err)
//         })
//         resolve(JSON.parse(data))
//     })
// }

app.get('/reservations', (_, res) => {
    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }
        const reservations = JSON.parse(data)

        return res.json(reservations)
    })
})

app.put('/reserve', (req, res) => {
    const selectedSeats = req.body
    console.log(selectedSeats)

    fs.readFile('./data.json', (err, data) => {
        if (err) {
            res.status(500).send('could not read file')
        }

        const reservations = JSON.parse(data)
        selectedSeats.forEach((seat) => {
            const index = reservations.findIndex((reservation) => reservation.seat === seat)

            if (reservations[index].reserved === true) {
                res.status(400).send('seat is already reserved')
            }

            if (reservations[index].reserved === false) {
                reservations[index].reserved = true
                reservations[index].myid = uid()
            }
        })
        fs.writeFile('./data.json', JSON.stringify(reservations), (err) => {
            if (err) {
                return res.status(500).send('could not complete reservation.')
            }
        })

        fs.readFile('./data.json', (err, data) => {
            if (err) {
                res.status(500).send('could not read file')
            }
        })
        console.log(reservations)
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
            reservations.reserved = false
        }
        console.log('reservations reset', reservations)
        fs.writeFile('./data.json', JSON.stringify(reservations), (err) => {
            if (err) {
                return res.status(500).send('could not delete reservations.')
            }
        })
        console.log('post-delete', reservations)
        return res.json(reservations)
    })
})

app.post('/api/ownermail', async (req, res) => {
    console.log('owner email')
    const message = {
        from: 'thisproject@me.com',
        to: 'owner@cinema.com',
        subject: 'new reservation received',
        //  
        text: `Cheers, you have just made another ${req.body.price} €. The following seats are now booked: ${req.body.seatsString}.`,
        html: `<p style="color:purple;">Cheers, you have just made another ${req.body.price} €. The following seats are now booked: ${req.body.seatsString}.</p>`
    }
    try {
        transport.sendMail(message, (err, info) => {
            return res.status(200).json({ message: 'good to go' })
        })
    }
    catch {
        res.status(500).json({ message: err })
    }
})


app.post('/api/customermail', (req, res) => {
    console.log('customer email')
    const message = {
        from: 'thisproject@me.com',
        to: 'customer@memail.com',
        subject: 'your reservation at KornerKino',
        //  
        text: `Thank you for booking with KornerKino! Your total price was ${req.body.price} €. You can use the following reservation ID numbers to edit your booking of these seats:${req.body.seatsString}.`,
        html: `<p style="color:purple;">Thank you for booking with KornerKino! Your total price was ${req.body.price} €. You can use the following reservation ID numbers to edit your booking of these seats:${req.body.seatsString}.</p>`
    }

    transport.sendMail(message, (err, info) => {
        console.log(info)
        if (err) return res.status(500).json({ message: err })
        return res.status(200).json({ message: 'good to go' })
    })
})

app.listen(PORT, () => console.log('running on port', PORT))