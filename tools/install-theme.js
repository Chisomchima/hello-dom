const fs = require('fs-extra');

// const copyFiles = async () => {
//   try {
//     await fs.copy('./node_modules/@pdftron/webviewer/public', './static/webviewer/');
//     console.log('WebViewer files copied over successfully');
//   } catch (err) {
//     console.error(err);
//   }
// };

const copyFiles = async () => {
    try {
        const existImg = await fs.exists('./theme/theme-image.jpeg');
        if (existImg) {
            await fs.copyFile('./theme/theme-image.jpeg', './assets/img/theme-image.jpeg', (err) => {
                if (err) throw err;
                console.log('theme image successfully copied to destination');
            });
        }else{
            console.log('theme image files does not exist')
        }

        const existVariable = await fs.exists('./theme/_variable.scss');
        if (existVariable) {
            await fs.copyFile('./theme/_variable.scss', './assets/css/_variable.scss', (err) => {
                if (err) throw err;
                console.log('theme colors successfully copied to destination');
            });
        }
        else{
            console.log('theme color files does not exist')
        }

        const template = await fs.exists('./theme/InvoiceTemplate.vue')
        if(template){
            await fs.copyFile('./theme/InvoiceTemplate.vue', './components/Dashboard/InvoiceTemplate.vue', (err) => {
                if (err) throw err;
                console.log('Invoice template copied successfully');
            });
        }
    } catch (error) {
        console.log(error)
    }

}

copyFiles();
