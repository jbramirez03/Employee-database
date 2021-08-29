<h1 align="center">Employee-database</h1> 
  
[LinkedIn]: https://www.linkedin.com/in/jason-barrera-ramirez-b2a473204/
![license-badge](https://img.shields.io/badge/License-MIT-blueviolet)
![followers](https://img.shields.io/github/followers/jbramirez03?style=social)

[MIT]: https://choosealicense.com/licenses/mit/
## Summary
This project focuses on the back-end of web development by using a database and node.js to make changes to a database from the command line.
## Table of Contents
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Challenges](#challenges)
- [Technologies](#technologies)
- [Future development](#future-development)
- [How to contribute](#how-to-contribute)
- [Questions](#questions)
- [Link](#link)
## Usage
In order to use the npm packages you must first run the command in the terminal `npm i` and all the dependencies in the package.json file will download. In order to begin running the prompts in the terminal you must run the line `node index.js`. Once the prompts appear,
depending on the action you want to take different tables appear or more prompts display. If you would like to exit the prompts screen simply choose the option `Exit`.
## Credits
Jason Barrera-Ramirez<br><br>
[<img align="left" width="28px" alt="LinkedIn" src="https://user-images.githubusercontent.com/82244776/128110957-497edff3-59dc-41d6-89bc-be7570e441fe.png" />][LinkedIn]<br><br>
## License
This Project is covered by the [MIT] license
## Challenges
The main challenge found when writing the logic for this project was the use of asynchronous functions and getting lines to run one after another. This problem was fixed through the use of the `mysql2/promise` wrapper in the mysql npm package. The challenge following closely behind was figuring out how to get the names of employees to appear in the inquirer prompts as a list of options. This was resolved through mapping the results of an sql call and pushing each individual employee name into an array in order to display as names in a list.
## Technologies
<img align="left" width="26px" alt="Node.js" src="https://user-images.githubusercontent.com/82244776/131235189-bd5f5fc2-6802-4f79-b553-267a05f37ab3.png">
<img align="left" width="26px" alt="Javascript" src="https://user-images.githubusercontent.com/82244776/128645657-2dad4760-43e6-42a9-90a5-8f8b3f62b4a0.png"><br><br>

## Features
The main feature of this project is being able to add an employee to the database after entering values in an inquirer prompt. Other features include adding roles, departments and updating employee's managers in the database.
## Future Development
A route this project is headed is eventually being able to delete employees, roles, departments from the database.
## How to Contribute
Fork the Repo and make a pull request for code to be reviewed and considered for merge to main branch.
## Questions
If there are any questions about the project get in contact with me at my [Email](mailto:jason1287712@gmail.com)
## Link 
This is the link to the
