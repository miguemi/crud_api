import express from 'express'
import notasEp from './notas_endpoint.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/', (_, res)=>{
  res.send("Hola, por favor navega al endpoint /notas")
})

app.use("/notas/", notasEp)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
