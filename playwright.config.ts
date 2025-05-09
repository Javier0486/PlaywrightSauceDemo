import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    // Workers configuration
    workers: 1, 
    
    //se especifica el navegador predeterminado 
    use: {
        browserName: 'chromium',
        headless: false, //se ejecuta en modo headless (sin interfaz grafica) o no
        viewport: null, //tamaño de la ventana del navegador
        permissions: [], // deniega todos los permisos
        launchOptions: {
            args: ['--start-maximized'],
        },
        screenshot: 'on', //captura screenshots solo en caso de fallos
        trace: 'on', //guarda trazas solo en caso de fallos
    },

    //configuracion de los reportes
    reporter: [
        ['list'], // muestras los resultados en la consola
        ['html', { outputFolder: 'reports/html' }], //genera un reporte HTML en la capeta 'reports/html'
    ],

    //configuracion de los tests
    testDir: './src/tests',//carpeta donde se encuentran los tests
    retries: 0, // numero de reintentos en caso de fallo
    timeout: 30000, //tiempo maximo por test (30 segundos)
};

export default config;