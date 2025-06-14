import { PlaywrightTestConfig } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

// Register the stealth plugin
chromium.use(stealth());

const config: PlaywrightTestConfig = {
    // Workers configuration
    workers: 1, 
    
    //se especifica el navegador predeterminado 
    use: {
        browserName: 'chromium',
        headless: true, //se ejecuta en modo headless (sin interfaz grafica)

        viewport: null, //tamaño de la ventana del navegador
        permissions: [], // deniega todos los permisos
        launchOptions: {
            args: [
                '--start-maximized',
            ],
        },
        // ADD A REALISTIC USER AGENT HERE
        // You can get a current User Agent by opening your browser's console (F12)
        // and typing: navigator.userAgent
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', // Example - update with a current one

        screenshot: 'on', //captura screenshots
        trace: 'on', //guarda trazas
        video: 'on',
    },

    //configuracion de los reportes
    reporter: [
        ['list'], // muestras los resultados en la consola
        ['html', { outputFolder: 'reports/html' }], //genera un reporte HTML en la capeta 'reports/html'
    ],

    //configuracion de los tests
    testDir: './src/tests',//carpeta donde se encuentran los tests
    retries: 0, // numero de reintentos en caso de fallo
    timeout: 99000, //tiempo maximo por test
};

export default config;