import express, { json } from 'express'
import routes from './routes'
import './database'

const app = express()
app.use(routes)
app.use(json())
const port = 3333

app.get('/', (req, res) => {
  return res.json({message : "ok"})
})

app.listen(3333, () => {
    console.log(`Server running on port ${port}...`)
})
