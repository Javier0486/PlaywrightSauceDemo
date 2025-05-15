## USar Git Bash como terminal

### Config.ts
# -	Environment configurations; such as URL, and credentials, to work with
# -	Singleton pattern to ensure there is a single, consisten source of truth for configuration values throughout the framework

### Locator.ts
# -	Locators for the different login pages;  usernameSelector, passwordSelector, and loginButtonSelector
# -	Singleton pattern to ensure there is a single, consisten source of truth for locators throughout the framework

### LoginManager.ts
# -	Function to login to different pages
# -	We call the methods from login.page.ts to login to the specific page
# -	Facade pattern

### fixtures.ts
# -	Custom fixtures for each page

### PageUtils.ts
# -	Implements utility pattern by providing a class with only static methods and no instance state. This allows to call common reusable page operation from anywhere in the tests without creating and object instance
# -	Can be used across different pages/tests

### tsconfig.json
# -	Here are configured the typescript compiler options

### playwright.config.ts
# -	Configures how playwright runner executes the test
# -	Uses chromium
# -	Reports configurations
# -	Tests configuration

### package.json
# -	Metadata: name, version, main entry, author, license, and description
# -	Scripts: test, soloTest, test:api
# -	Dependencies: ajv for json schema validation, and playwright for browser automation and testing
# -	DevDependencies: 
#### o	playwright test runner (“@playwright/test”)
#### o	typescript type definitions (“@types/ajv” and “@types/node”)
#### o	typescript compiler (“typescript”)
