import React from 'react'
import './App.css'
import { Route } from './router/Route'
import { Routes, useParams } from './router/RouteContext'
import { Link, Router } from './router/RouterContenxt'

function Product() {
  const { id } = useParams() as { id: string }
  return (
    <>
      <h4>Viewing product {id}</h4>
      <Link to="/">Back to all products</Link>
    </>
  )
}

function Products() {
  return (
    <>
      <h4>Example Products</h4>
      <ul>
        <li>
          <Link to="/products/1">Product One</Link>
        </li>
        <li>
          <Link to="/products/2">Product Two</Link>
        </li>
      </ul>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/products/:id">
            <Product />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
