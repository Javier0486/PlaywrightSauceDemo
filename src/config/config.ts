/**
 * Centralized configuration module containing all environment-specific settings.
 * Implements Singleton Pattern through constant exports to provide:
 * - Single source of truth for all environment configurations
 * - Global access without requiring class instantiation
 * - Consistent structure across different environments
 * 
 * Contains:
 * - Base URLs for all applications
 * - Authentication credentials
 * - API endpoints
 */
export const ENV_CONFIG = { 
    BASE_URL: 'https://www.saucedemo.com',
    AE_URL: 'https://www.automationexercise.com/login',
    LIVERPOOL_URL: 'https://www.liverpool.com.mx/',
    credentials: {
        saucedemo: {
            USERNAME: 'standard_user',
            PASSWORD: 'secret_sauce',
        },
        automationExercise: {
            AEUSERNAME: 'javiermm1986@gmail.com',
            AEPASSWORD: 'Password123'
        },
        liverpool: {
            LUSERNAME: 'javiertraining1986@gmail.com',
            LPASSWORD: 'Password1986'
        }
    },
};

/**
 * AutomationExercise API endpoint for product data
 */
export const AE_API_URL = 'https://automationexercise.com/api';