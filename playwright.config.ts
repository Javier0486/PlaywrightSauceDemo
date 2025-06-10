import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    // Workers configuration
    workers: 1, 
    
    //se especifica el navegador predeterminado 
    use: {
        browserName: 'chromium',
        headless: false, //se ejecuta en modo headless (sin interfaz grafica)
        viewport: null, //tamaño de la ventana del navegador
        permissions: [], // deniega todos los permisos
        launchOptions: {
            args: ['--start-maximized'],
        },
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