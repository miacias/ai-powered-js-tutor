import { useState } from 'react'
import './App.css'
import { promptFunc } from './utils/OpenAi.js'

function App() {
  const [aiResponse, setApiResponse] = useState({});

  const userInput = async (event) => {
    event.preventDefault();
    const input = document.querySelector('#js-question-input').value;
    console.log(input);
    const newData = await promptFunc(input);
    setApiResponse(newData);
    console.log('newData', newData);
  };

  return (
    <>
      <main>
        <h1>Welcome to your JavaScript Tutor!</h1>
        <section className='ask'>
          <form>
            <div>
              <label title='js-question-input'>Ask a JavaScript coding question: </label>
              <input id='js-question-input'></input>
            </div>
            <button
              type='submit'
              id='js-question-btn'
              onClick={() => userInput(event)}
              style={{ margin: '20px' }}>
                Ask!
            </button>
          </form>
        </section>
        {aiResponse?.code && aiResponse?.explanation && (
          <section className='response'>
            <div>{aiResponse?.code}</div>
            <div>{aiResponse?.explanation}</div>
          </section>
        )}
      </main>
    </>
  )
}

export default App
