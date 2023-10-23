import { Router } from 'express'

import mercadopago from 'mercadopago'

mercadopago.configure({
  access_token: process.env.PAYMENTS_SECRET_TOKEN,
})

// eslint-disable-next-line new-cap
export const router = Router()
/**
 * /api/v1/students/signin/student      POST   -   SignIn with credentials
 * /api/v1/students/signup/student      POST   -   Create student account
 * /api/v1/students                     GET    -   list all the students
 * /api/v1/students/:id                 GET    -   Read one student
 * /api/v1/students/:id                 PUT    -   Update one student
 * /api/v1/students/:id/lessons                -   The student's lessons
 */
console.log(router)

router.post('/preference_id', (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: Number(req.body.unit_price),
        quantity: Number(req.body.quantity),
        amount: req.body.amount,
      },
    ],
    back_urls: {
      success: 'http://localhost:3001/',
      failure: 'http://localhost:3001/feedback',
      pending: 'http://localhost:3001/feedback',
    },
    auto_return: 'approved',
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
      const preferenceId = response.body.id
      res.json({
        preferenceId: preferenceId,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

router.post('/payment/create', (req, res) => {
  let preference = {
    items: [
      {
        id: 'item-ID-1234',
        title: 'Meu produto',
        quantity: 1,
        unit_price: 75000,
      },
    ],
    back_urls: {
      success: 'http://localhost:3001/',
      failure: 'http://localhost:3001/feedback',
      pending: 'http://localhost:3001/feedback',
    },
    auto_return: 'approved',
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // Este valor es el ID de preferencia que se enviará al ladrillo al inicio
      const preferenceId = response.body.id
      res.json({
        preferenceId: preferenceId,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

router.get('/feedback', function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
})
