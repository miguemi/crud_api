import express from 'express'
import NOTAS from './notas.js'
import {v4} from 'uuid'

// ENDPOINT DE NOTAS
const notasEp = express.Router()


//ENDPOINT PARA OBTENER TODAS LAS NOTAS (c R u d)
notasEp.get('/', (_, res)=>{
  res.json(NOTAS)
})


//ENDPOINT PARA OBTENER UNA NOTA ESPECIFICA (c R u d)
notasEp.get('/:id', (req, res)=>{
  const id = req.params.id
  const nota = NOTAS.find(x=> x.id == id)


  if(!nota){
    res.status(404).json({
      "error": "Nota no encontrada"
    })
    return 
  }

  res.json(nota)
})

//ENDPOINT PARA CREAR UNA NOTA (C r u d)
notasEp.post("/create/", (req, res)=>{
  const newId = v4()
  const {titulo, contenido}= req.body || {}
  if(!titulo || !contenido){
    res.status(400).json({
      "error": "Bad request, no pasaste el titulo de la nota o su contenido"
    })
    return 
  }

  NOTAS.push({
    id: newId,
    titulo,
    contenido
  })

  res.send(`Nota creada con exito nuevo id ${newId}`)
})


//ENDPOINT PARA ACTUALIZAR UNA NOTA (c r U d)
notasEp.put('/update/:id', (req, res) => {

  const idXActualizar = req.params.id
  const indiceXActualizar = NOTAS.findIndex(x=> x.id == idXActualizar)
  const {titulo, contenido}= req.body || {}

  if(!titulo || !contenido){
    res.status(400).json({
      "error": "Bad request, no pasaste el titulo de la nota o su contenido"
    })
    return 
  }

  if(indiceXActualizar == -1){
    res.status(404).json({
      "error": "no existe ese objeto"
    })
    return
  }


  NOTAS[indiceXActualizar].titulo = titulo
  NOTAS[indiceXActualizar].contenido = contenido


  res.send({
    message: "Objeto actualizado con exito",
    obActualizado: NOTAS[indiceXActualizar]
  })
})

//ENDPOINT PARA ELIMINAR UNA NOTA  (c r u D)
notasEp.delete("/delete/:id", (req, res) =>{
  const idXBorrar = req.params.id;
  const indiceXBorrar = NOTAS.findIndex(x => x.id == idXBorrar);

  if(indiceXBorrar == -1){
    res.status(404).json({
      "error": "no existe ese objeto"
    })
    return
  }

  const objetoBorrado = NOTAS.splice(indiceXBorrar, 1);
  res.send(objetoBorrado)
})


export default notasEp
