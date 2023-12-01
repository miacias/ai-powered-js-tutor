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
      template: "You are a JavaScript expert. Respond to the user's coding questions as thorougly as possible in the form of one JSON object. The first key-value pair will be sample code you provide with a key called code and a string value, and the second will be an explanation of the code with a key called explanation and a string value. Use line breaks where appropriate. You must format your output as a JSON value that adheres to a given \"JSON Schema\" instance. Properly use escape characters parsewith a backslash in the response where appropriate to maintain a proper string. Limit the entire response to 250 characters.\n{question}",
      inputVariables: ["question"],
      partialVariables: {
        format_instructions: formatInstructions,
        // max_explanation_length: 500,
      }
    });

    // passes inuser input to prompt template
    const promptInput = await prompt.format({
      question: input,
    });

    // sends request to OpenAI with user input formatted into a template
    const res = await model.call(promptInput);
    const jsonStart = res.indexOf('{');
    const jsonEnd = res.lastIndexOf('}');
    const jsonRes = res.slice(jsonStart, jsonEnd + 1);
    // call .parse() to pass in the response
    return parser.parse(jsonRes);
  } catch (err) {
    console.error('Error parsing OpenAI response:', err);
  }
};

export { promptFunc };
