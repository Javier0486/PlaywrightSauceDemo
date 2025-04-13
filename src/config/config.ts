
/**
 * Centralized configuration for all environments and applications
 * Uses singleton-like pattern for easy access
 */
export const ENV_CONFIG = { // Singleton-like configuration object patter
    BASE_URL: 'https://www.saucedemo.com',
    AE_URL: 'https://www.automationexercise.com/',
    credentials: {
        saucedemo: {
            USERNAME: 'standard_user',
            PASSWORD: 'secret_sauce',
        },
        automationExercise: {
            AEUSERNAME: 'javiermm1986@gmail.com',
            AEPASSWORD: 'Password123'
        },
    },
};

export const AE_GETPRODUCTS_URL = 'https://automationexercise.com/api';

/*
* We use singleton-like patter by exporting constants objects
* that contain all configuration information. This ensures:
* - Single source of truth for configuration
* - Easy access from anywhere in the application
* - No need to instance classes to access these values
*
*/