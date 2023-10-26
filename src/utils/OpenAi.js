// dependencies
// import inquirer from 'inquirer';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

// instantiates a wrapper OpenAI with basic config
const model = new OpenAI({ 
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, 
  temperature: 0,
  model: 'gpt-3.5-turbo'
});

// console.log(import.meta.VITE_OPENAI_API_KEY)
// console.log({ model });

// passes in prompts to OpenAI via user inputs from Inquirer
const promptFunc = async (input) => {
  try {
    // structures the OpenAI response for uniformity of responses
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      code: "JavaScript code that answers the user's question",
      explanation: "detailed explanation of the example code provided",
    });

    // passes parser instructions to prompt template
    const formatInstructions = parser.getFormatInstructions();

    // creates OpenAI prompt template
    const prompt = new PromptTemplate({
      template: "You are a JavaScript expert and will answer the user's coding questions as thorougly as possible.\n{question}",
      inputVariables: ["question"],
      partialVariables: {
        format_instructions: formatInstructions
      }
    });

    // passes inuser input to prompt template
    const promptInput = await prompt.format({
      question: input,
    });

    // sends request to OpenAI with user input formatted into a template
    const res = await model.call(promptInput);
    return parser.parse(res);
    // call .parse() to pass in the response
    // console.log(await parser.parse(res));
  } catch (err) {
    console.error(err);
  }
};

export { promptFunc };
