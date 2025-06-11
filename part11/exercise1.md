
1- So I would pick JS/Typescript and for lining I would use Eslint for code formatting and rules across the project. For testing, we have 2 things, front-end and back-end. For the front-end I would use Jest and Playwright for Unit and End-to-End testing. On the back-end side I would use Integration Testing and Unit Testing with node-js-test and Postman. For building Webpack would be the best option. 
Code Change: Developer pushes code to a Git repository. 
Trigger: CI/CD tool (e.g., GitLab CI, GitHub Actions, CircleCI) is triggered. 
Linting: ESLint checks for style and code quality issues. 
Testing: Jest runs automated unit and integration tests. 
Building: Webpack or Parcel bundles the code, optimizes assets, and prepares the application for deployment. 
Artifacts: Generated build artifacts (e.g., JavaScript bundles, CSS files) are stored. 
Deployment: The application is deployed to a production environment or staging environment. 

2- GitLab, CIrcleCI and AWS CodePipeline.

3- Cloud-based environment would be much better. Why? Our app is simple, and recently GItHub Actions for example has been more reliable than Jenkins, in terms of complexity and less-errors in deployment. The information that I need, it would be the size of the project that I'm building, complexity, how many people are familiar with the CI that we gonna use across the project. 
