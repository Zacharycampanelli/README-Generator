// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

let title;
// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the name of the Project? (Required)',
    validate: (projectInput) => {
      if (projectInput) {
        return true;
      } else {
        console.log('Please enter your Project Name!');
        return false;
      }
    },
  },
  {
    type: 'input',
    name: 'name',
    message: 'What is your name? (Required)',
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name!');
        return false;
      }
    },
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username (Required)',
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please enter your GitHub Username!');
        return false;
      }
    },
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email? (Required)',
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log('Please enter your email!');
        return false;
      }
    },
  },
  {
    type: 'editor',
    name: 'description',
    message: 'Please give a description of your project. (Required)',
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log('Please enter a description of this project!');
        return false;
      }
    },
  },
  {
    type: 'editor',
    name: 'installation',
    message:
      'Please give any necessary instructions to install this application. (Required)',
    validate: (installationInput) => {
      if (installationInput) {
        return true;
      } else {
        console.log('Please enter installation instructions!');
        return false;
      }
    },
  },
  {
    type: 'editor',
    name: 'usage',
    message:
      'Please provide any instructions and examples of using this application. (Required)',
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log('Please enter usage information!');
        return false;
      }
    },
  },
  {
    type: 'editor',
    name: 'credits',
    message:
      'Please enter any credits, including collaborators, third-party assets, and tutorials. (Required)',
    validate: (creditsInput) => {
      if (creditsInput) {
        return true;
      } else {
        console.log('Please enter credit information!');
        return false;
      }
    },
  },
  {
    type: 'rawlist',
    name: 'license',
    message:
      'Please choose which type of license your project will have (Required)',
    choices: [
      'agpl_3.0',
      'gpl_3.0',
      'lgpl_3.0',
      'mpl_2.0',
      'mit',
      'bsl_1.0',
      'unlicense',
    ],
  },
  {
    type: 'confirm',
    name: 'confirmScreenshot',
    message: 'Would you like to include a screenshot?',
    default: true,
  },
  {
    type: 'input',
    name: 'screenshot',
    message: 'Enter file name: (Must be located in assets/images folder',
    when: ({ confirmScreenshot }) => confirmScreenshot,
  },
  {
    type: 'input',
    name: 'altTextScreenshot',
    message: 'Enter alt text for screenshot:',
    when: ({ confirmScreenshot }) => confirmScreenshot,
  },
    {
    type: 'confirm',
    name: 'confirmContributing',
    message: 'Would you like to include a contributing section?',
    default: true,
  },
  {
    type: 'editor',
    name: 'contributing',
    message:
      'Please enter any necessary guidelines for contributing to this project.',
    when: ({ confirmContributing }) => confirmContributing,
  },
  {
    type: 'confirm',
    name: 'confirmFeatures',
    message: 'Would you like to include a features section?',
    default: true,
  },
  {
    type: 'editor',
    name: 'features',
    message:
      'Enter features of the project.',
      when: ({ confirmFeatures }) => confirmFeatures,
  },
  {
    type: 'confirm',
    name: 'confirmTests',
    message: 'Would you like to include a tests section?',
    default: true,
  },
  {
    type: 'editor',
    name: 'tests',
    message: 'Include any tests written for the project as well as examples on how to run them.',
    when: ({ confirmTests }) => confirmTests
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./dist/${fileName}.md`, data, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File Created!',
      });
    });
  });
}

// TODO: Create a function to initialize app
function init() {
  return inquirer.prompt(questions);
}

// Function call to initialize app
init()
  .then((readmeData) => {
    title = readmeData.title;
    return generateMarkdown(readmeData);
    // writeToFile('README', readmeData);
  })
  .then((readmeTemplate) => {
    console.log(readmeTemplate);
    writeToFile(title, readmeTemplate);
  })
  .catch((err) => {
    console.log(err);
  });
