// import de la funcion useState
import { useState, useEffect } from 'react' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from './components/MyComponent'

function App() {
  const [count, setCount /* sub-funcion del useState */] = useState(0)

  const test = (valor) => {
    setCount(valor);
  }

  useEffect(() => {
    console.log(":3");
  }, [/* ¿y aqui qué? */])

  return (
    <>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <button onClick={() => {test(10)}}>
          10
        </button>
        <button onClick={() => {test(20)}}>
          20
        </button>
        <h1>{count}</h1>
        <MyComponent saludo = "aaa"><h2>1</h2></MyComponent>
        <MyComponent saludo = "bbb"><h2>2</h2></MyComponent>
        <MyComponent saludo = "ccc"><h2>3</h2></MyComponent>  
        <MyComponent saludo = "ddd"><h2>4</h2></MyComponent>  
      </div>
    </>
  )
}

export default App