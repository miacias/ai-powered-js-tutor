// dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');

// instantiates a wrapper OpenAI with basic config
const model = new OpenAI({ 
  openAIApiKey: process.env.OPENAI_API_KEY, 
  temperature: 0,
  model: 'gpt-3.5-turbo'
});

// console.log({ model });

// passes in prompts to OpenAI via user inputs from Inquirer
const promptFunc = async (input) => {
  try {
    const res = await model.call(input);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
};

// initializes Inquirer, returns a promise to be passed to OpenAI as a prompt
const init = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Ask a JavaScript coding question:',
    },
  ])
  .then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
  });
};

// starts the script
init();