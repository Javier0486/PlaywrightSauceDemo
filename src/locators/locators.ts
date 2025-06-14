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
        logoutButtonSelector: '//a[normalize-space(text())="Logout"]',
    },
    liverpool: {
        usernameSelector: '#username',
        passwordSelector: '#password',
        loginButtonSelector: '//button[normalize-space(text())="Iniciar sesión"]',
        usernameMenuSelector: '.a-header__topLink',
        logoutLocator: "//a[normalize-space(text())='Cerrar sesión']"
    },
    peek: {
        usernameSelector: '#user_email',
        passwordSelector: '#user_password',
        loginButtonsSelector: `//button[normalize-space(text())='Log in']`,
        userButtonSelector: '//div[@data-integration="nav-panel-button"]',
        logsignSelector: '//a[@data-integration="login-modal-button"]',
        loginButtonInModalSelector: '//a[normalize-space(text())="Log in"]',
        cookiesAcceptSelector: '//button[@data-tid="banner-accept"]',
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