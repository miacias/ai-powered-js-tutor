// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { promptFunc } from './utils/OpenAi.js'

const userInput = (event) => {
  event.preventDefault();
  const input = document.querySelector('#js-question-input').value;
  console.log(input);
  promptFunc(input);
};

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <section>
        <form>
          <div>
            <label title='js-question-input'>Ask a JavaScript coding question: </label>
            <input id='js-question-input'></input>
          </div>
          <button
            type='submit'
            id='js-question-btn'
            onClick={() => userInput(event)}>Ask!
          </button>
        </form>
      </section>
      {/* <section>
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </section> */}
    </main>
      
    </>
  )
}

export default App
