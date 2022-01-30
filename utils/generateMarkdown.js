const licenses = [
  {
    name: 'agpl',
    desc: 'Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.',
  },
  {
    name: 'gpl',
    desc: 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.',
  },
  {
    name: 'lgpl',
    desc: 'Permissions of this copyleft license are conditioned on making available complete source code of licensed works and modifications under the same license or the GNU GPLv3. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work through interfaces provided by the licensed work may be distributed under different terms and without source code for the larger work.',
  },
  {
    name: 'mpl',
    desc: 'Permissions of this weak copyleft license are conditioned on making available source code of licensed files and modifications of those files under the same license (or in certain cases, one of the GNU licenses). Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work may be distributed under different terms and without source code for files added in the larger work.',
  },
  {
    name: 'apache',
    desc: 'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.',
  },
  {
    name: 'mit',
    desc: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.',
  },
  {
    name: 'bsl',
    desc: 'A simple permissive license only requiring preservation of copyright and license notices for source (and not binary) distribution. Licensed works, modifications, and larger works may be distributed under different terms and without source code.',
  },
  {
    name: 'unlicense',
    desc: 'A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.',
  },
];

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license) {
    return 'https://img.shields.io/badge/license-' + license + '-green';
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license) {
    let shortLicense = license.split('_');
    shortLicense = shortLicense[0];
    let result = licenses.filter((e) => e.name == shortLicense);
    return result[0].desc;
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    return renderLicenseLink(license);
  } else {
    return '';
  }
}

function renderScreenshot(confirm, screenshot, altText) {
  if (confirm) {
    return `![` + altText + `](assets/images/` + screenshot + `)`;
  } else {
    return '';
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let TOC = `
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Credits](#Credits)
`;
  if (data.confirmContributing) {
    TOC += `* [Contributing](#Contributing)
`;
  }
  if (data.confirmFeatures) {
    TOC += `* [Features](#Features)
`;
  }
  if (data.confirmTests) {
    TOC += `* [Tests](#Tests)
`;
  }

  TOC += `* [Questions](#Questions)
`;

  let markdown = `
# ${data.title}
  
## Description 
![license badge](${renderLicenseBadge(data.license)})
  
${data.description}
`;
  markdown += TOC;

  markdown += `

## Installation
${data.installation}
  
## Usage
${data.usage}
`;

  if (data.confirmScreenshot === true) {
    markdown += `
${renderScreenshot(
  data.confirmScreenshot,
  data.screenshot,
  data.altTextScreenshot
)}`;
  }

  markdown += `

## License
${renderLicenseSection(data.license)}  
  
## Credits
${data.credits}
  `;

  if (data.contributing) {
    markdown += `
## Contributing
${data.contributing}
`;
  }

  if (data.features) {
    markdown += `
## Features
${data.features}
`;
  }

  if (data.tests) {
    markdown += `
## Tests
${data.tests}
`;
  }

  markdown += `
## Questions
If you have any questions, concerns, or comments, feel free to contact me:
  
-GitHub: [${data.github}](https://github.com/${data.github})  
-Email: [${data.email}](mailto:${data.email})
`;

  return markdown;
}

module.exports = generateMarkdown;
