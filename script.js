// dependencies
require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
const { PromptTemplate } = require("langchain/prompts");

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
    // creates OpenAI prompt template
    const prompt = new PromptTemplate({
      template: "You are a JavaScript expert and will answer the user's coding questions as thorougly as possible.\n{question}",
      inputVariables: ["question"],
    });
    // passes inuser input to prompt template
    const promptInput = await prompt.format({
      question: input,
    });
    // sends request to OpenAI with user input formatted into a template
    const res = await model.call(promptInput);
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
      // validation
    },
  ])
  .then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
  });
};

// starts the script
init();