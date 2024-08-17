const tf = require('telegraf')
const { getCodRoute } = require('./querys')

const bot = new tf.Telegraf(process.env.TELEGRAM_TOKEN)

bot.start((ctx) => {
    ctx.reply('Hola, Soy ComerBot 🤖\n\n'
        + 'Estare ayudandote en el proceso de obtencion de codigos de venta 💹💰\n\n'
        + 'Para obtener los codigos de una ruta escriba lo siguiente:\n\n'
        + '\t\t\t/codigo <ClaveRuta>\n\n'
        + 'Se le otorgaran las claves de venta de la ruta especificada\n\n'
        + 'Tambien puedes usar el comando /help para mostrarte informacion de contacto para el soporte tecnico 👾')
})

bot.help((ctx) => {
    ctx.reply('Seccion de ayuda de ComerBot 🤖\n\n'
        + 'Hemos sido infomados sobre tus dudas sobre el bot, pronto nos pondremos en contacto contigo. \n\n -SoporteTi 🖥️')
})

bot.command('codigo', async (ctx) => {
    let cod = ctx.message.text
    cod = cod.replace('/codigo ', '')
    cod = cod.trim()
    let regex = /^[0-9]+/
    if (!regex.test(cod)) {
        ctx.reply('Advertencia!⚠️\n\n' +
            'El comando /codigo, debe ir seguido del codigo de la ruta, Ejemplo:\n\n' + '\t\t\t/codigo 123456')
    } else {
        ctx.reply('Verificando codigo de ruta 🖥️')
        let codRoutes = await getCodRoute(cod)
        if (codRoutes.length == 0) {
            ctx.reply('No se encontraron codigos para la ruta especificada\n\nPor favor intente nuevamente.')
        } else {
            textcod = ''
            codRoutes.forEach(el => {
                textcod += el + '\n'
            });
            ctx.reply('Codigos Disponibles para la Ruta ' + cod + ' 🚚:\n\n' + textcod + '\nEncantado de ayudar 🤖')
        }
    }
})

bot.launch()