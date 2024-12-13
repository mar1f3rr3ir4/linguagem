const express = require('express')
const cors = require('cors')
const { BodyBuilder } = require('./src/bodybuilder/bodybuilder.entity')
const { Gym } = require('./src/gym/gym.entity')
const { Style } = require('./src/estilos/style.entity')
const app = express()
app.use(cors())
const port = 3000
app.use(express.json())

//banco de dados de clientes
var clientes = []

// bamco de dados academias
var academias = [
  {id: 1, nome: "Academia 1", telefone:"1234556", bodyBuilders: []},
  {id: 2, nome: "Academia 2", telefone:"1222222", bodyBuilders: []},
  {id: 3, nome: "Academia 3", telefone:"1333333", bodyBuilders: []},
  {id: 4, nome: "Academia 4", telefone:"0000000", bodyBuilders: []}
]

var estilos = [
  {id: 5, nome: "Monstrão"},
  {id: 6, nome: "Frango"},
  {id: 7, nome: "Chassi de Grilo"}
]

app.post('/body-builder', (req, res) => {
    // console.log(req.body)

    const data = req.body //receber o bodyBuilder, que é um objeto JSON que vem do front-end

    //pega o idAcademia e encontra o objeeto gym
    const idAcademia = data.idAcademia
    const gym = academias.find((gym) => gym.id == idAcademia)

     //pega o idAcademia e encontra o objeeto gym
     const idEstilo = data.idEstilo
     const style = estilos.find((style) => style.id == idEstilo)



    
  // após pegar o objeto gym, o vinvula a acade
  let bodyBuilder = new BodyBuilder(data.nome, data.cpf, data.peso, data.altura,data.dataNascimento, data.sapato,  gym, style)
// depois daqui deu erro, não consegui fazer mais
  clientes.push(bodyBuilder) //adicionar o bodyBuiler no banco de dados
    res.send("Cadastrou")
})

app.put('/body-builder/:cpf', (req, res) => {
  let cpf = req.params.cpf
  for(let i=0; i < clientes.length; i++){
    let cliente = clientes[i]
    if (cliente.cpf == cpf){
      const data = req.body
      let bodyBuilder = new BodyBuilder(data.nome, data.cpf, data.peso, data.altura,data.dataNascimento, data.sapato )      
      clientes[i] = bodyBuilder 
      //substitui o bodyBuilder pelos dados enviados no body
      res.send("Atualizou")
    }
  }
  throw new Error("Body builder nao encontrado")
})

app.delete('/body-builder/:cpf', (req, res) => {
  let cpf = req.params.cpf
  for(let i = 0; i < clientes.length; i++){
      let cliente = clientes[i]
      if (cliente.cpf == cpf){
          clientes.splice(i, 1)
          res.send("Deletou")        
      }
  }
  throw new Error("Cliente nao encontrado")
})

app.get('/body-builder', (req, res) => {
  let busca = req.query.busca
  let clientesFiltrados
  if (busca){ //se a busca for diferente de vazio
    clientesFiltrados = clientes.filter((cliente) => {
      return cliente.nome.toLowerCase().includes(busca.toLowerCase())
      || cliente.cpf.toLowerCase().includes(busca.toLowerCase())
    })
  }else{
    clientesFiltrados = clientes
  }
  res.json(clientesFiltrados)
})

app.post('/gym', (req, res) =>{
  const data = req.body
  let gym = new Gym()
  gym.nome = data.nome
  gym.telefone = data.telefone
  academias.push(gym)
  res.send("Cadastrou")
})



app.get('/gym', (req, res) => {
  res.json(academias)
})
app.post('/style', (req, res) =>{
  const data = req.body
  let style = new Style()
  style.nome = data.nome
  estilos.push(style)
  res.send("Cadastrou")
})
app.get('/style', (req, res) => {
  res.json(estilos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})