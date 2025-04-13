export const LOCATORS = { // Singleton-like locators object pattern
    saucedemo: {
        usernameSelector: '#user-name',
        passwordSelector: '#password',
        loginButtonSelector: '#login-button',
    },
    automationExercise: {
        usernameSelector: 'input[data-qa="login-email"]',
        passwordSelector: 'input[data-qa="login-password"]',
        loginButtonSelector: 'button[data-qa="login-button"]',
    }
}

/*
* We use a singleton-like pattern by exporting constant
* objects that contain all locator information. This ensures:
* - Single source of truth for configuration
* - Easy access from anywhere in the application
* - No need to instantiate classes to access these values
*
*/