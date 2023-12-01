import { useState } from 'react'
import 'animate.css';
import './App.css'
import { promptFunc } from './utils/OpenAi.js';

// test comment
function App() {
  const [aiResponse, setApiResponse] = useState({});
  const [error, setError] = useState(null);

  const userInput = async (event) => {
    event.preventDefault();
    setError(null);
    const input = document.querySelector('#js-question-input').value.trim();
    try {
      const newData = await promptFunc(input);
      setApiResponse(newData);
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <>
    <header>
      <img className='logo' src='OpenAiJS.png'/>
      <h1>Welcome to your JavaScript Tutor!</h1>
    </header>
      <main>
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
          <section className='response animate__flipInX'>
            <div>{aiResponse?.code}</div>
            <div>{aiResponse?.explanation}</div>
            {error && (
              <div className='error-msg'>
                <p>{error}</p>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  )
}

export default App
