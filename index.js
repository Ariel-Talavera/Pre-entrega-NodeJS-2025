import fetch from 'node-fetch';
// A futuro, en caso de querer emplear herramientas de AI generativa
//import { useGemini } from './gemini.js';

const API_URL = 'https://fakestoreapi.com'
const argv = process.argv.slice(2)
const [method, resource, ...params] = argv

async function main() {
  if (!["GET", "POST", "DELETE"].includes(method)) {
    console.error('Error: Método no permitido.')
    return
  }
  switch(method) {
    case "GET":
      let products = await getProducts(resource)
      console.log(JSON.stringify(products, null, 2))
      break
    case "POST":
      let status = await newProduct(resource, params)
      console.log(status)
      break
    case "DELETE":
      let statusD = await deleteProduct(resource)
      console.log(statusD)
      break
    default:
      break
  }
}

async function getProducts(resource) { 
  const url = `${API_URL}/${resource}`

  try {
    return await fetch(url).then(response => response.json())
  } catch (error) {
    console.error('Ocurrió un error al consultar la API:', error.message)
  }
}

async function newProduct(resource, params) {
  const url = `${API_URL}/${resource}`
  const [title, price, category] = params
  const product = { title, price, category }
  
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(response => response.json())
  } catch (error) {
    console.error('Ocurrió un error al consultar la API:', error.message)
  }
}

async function deleteProduct(resource) { 
  const url = `${API_URL}/${resource}`

  try {
    return await fetch(url, {
      method: 'DELETE'
    }).then(response => response.json())
  } catch (error) {
    console.error('Ocurrió un error al consultar la API:', error.message)
  }
}

main()