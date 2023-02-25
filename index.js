const fs = require("fs");
const inquirer = require("inquirer");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
[["title"],["What is the title of the project?"]],
[["description"],["Enter the project description: "]],
[["install"],["Enter the installation guidelines: "]],
[["usage"],["Enter the usage guidelines: "]],
[["contribute"],["Enter information about contributors: "]],
[["test"],["Enter the test instructions: "]],
[["githubusername"],["Enter your github username: "]],
[["email"],["Enter your email address: "]],
];
 
const licenses = [
  {
    name: 'Apache 2.0 License',
    checked: false
  },
  {
    name: 'Boost Software License 1.0',
    checked: false
  },
  {
    name: 'BSD 3-Clause License',
    checked: false
  },
  ,
  {
    name: 'Eclipse Public License 1.0',
    checked: false
  },
  {
    name: 'GNU GPL v3',
    checked: false
  },
  {
    name: 'IBM Public License Version 1.0',
    checked: false
  },
  {
    name: 'The MIT License',
    checked: false
  },
  {
    name: 'Mozilla Public License 2.0',
    checked: false
  },

];

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: questions[0][0],
      message: questions[0][1],
    },
    {
      type: 'input',
      name: questions[1][0],
      message: questions[1][1],
    },
    {
      type: 'input',
      name: questions[2][0],
      message: questions[2][1],
    }
    ,
    {
      type: 'input',
      name: questions[3][0],
      message: questions[3][1],
    },
    {
      type: 'input',
      name: questions[4][0],
      message: questions[4][1],
    },
    {
      type: 'input',
      name: questions[5][0],
      message: questions[5][1],
    },
    {
      type: 'input',
      name: questions[6][0],
      message: questions[6][1],
    },
    {
      type: 'input',
      name: questions[7][0],
      message: questions[7][1],
    },
    {
    type: 'checkbox',
      message: 'Choose a License:',
      name: 'license',
      choices: licenses,
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one license.';
        }
        return true;
      }
    }
  ]);

const LicenseBadge = (response)  => 
{
  if(response.license == "Apache 2.0 License")return"[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  if(response.license == "Boost Software License 1.0")return"[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
  if(response.license == "BSD 3-Clause License")return"[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
  if(response.license == "Eclipse Public License 1.0")return"[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
  if(response.license == "GNU GPL v3")return"[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  if(response.license == "IBM Public License Version 1.0")return"[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)";
  if(response.license == "The MIT License")return"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  if(response.license == "Mozilla Public License 2.0e")return"[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
}

let badge;

const generateMD = (response) =>

`
# ${response.title}

${badge}


## Description 

${response.description}

## Table of Contents 

[Installation](#installation)
[Usage](#usage)
[License](#license)
[Contributing](#contributing)
[Tests](#tests)
[Questions](#questions)

## Installation 

${response.install}

## Usage 

${response.usage}

## License 

The license this project falls under is ${response.license}.

## Contributing 

${response.contribute}

## Tests 

${response.test}

## Questions

For any questions you can contact me in the following ways:

[GitHub](https://github.com/${response.githubusername})

Email: ${response.email}
`
;

promptUser()
  .then((response) =>
  {
    badge = LicenseBadge(response);
    writeFileAsync('readme.md', generateMD(response));
    console.log('Successfully wrote to readme.md');
  }).catch((err) => console.error(err));;
  






// When a user enters their GitHub username then this is added to the section of the README entitled Questions, with a link to their GitHub profile

// When a user enters their email address then this is added to the section of the README entitled Questions, with instructions on how to reach them with additional questions

// When a user clicks on the links in the Table of Contents then they are taken to the corresponding section of the README