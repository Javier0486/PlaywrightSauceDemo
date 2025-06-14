import * as dotenv from 'dotenv';
dotenv.config();
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
    PEEK_URL: 'https://www.peek.com/',
    credentials: {
        saucedemo: {
            USERNAME: process.env.SAUCEDEMO_USERNAME || '',
            PASSWORD: process.env.SAUCEDEMO_PASSWORD || '',
        },
        automationExercise: {
            AEUSERNAME: process.env.AE_USERNAME || '',
            AEPASSWORD: process.env.AE_PASSWORD || '',
        },
        liverpool: {
            LUSERNAME: process.env.LIVERPOOL_USERNAME || '',
            LPASSWORD: process.env.LIVERPOOL_PASSWORD || '',
        },
        peek: {
            PEEK_USERNAME: process.env.PEEK_USERNAME || '',
            PEEK_PASSWORD: process.env.PEEK_PASSWORD || ''
        }
    },
};

/**
 * AutomationExercise API endpoint for product data
 */
export const AE_API_URL = 'https://automationexercise.com/api';