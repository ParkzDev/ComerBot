const tf = require('telegraf')
const { selectionRouteNumber } = require('./routenumber.js')
const { selectionRouteAv, selectionRoutePv, selectionRouteRp } = require('./routetype.js')

const bot = new tf.Telegraf(process.env.TELEGRAM_TOKEN)
const validUsers =  process.env.TELEGRAM_USERS.split(',')

bot.start((ctx) => {
    if (validUsers.indexOf(String(ctx.update.message.from.id)) == -1) return
    ctx.reply('Hola, Soy ComerBot 🤖\n\n'
        + 'Estare ayudandote en el proceso de obtencion de codigos de venta 💹💰\n\n'
        + 'Selecciona alguna de las opciones presentadas a continuacion para saber el tipo de ruta 🚚 a la cual obtendras sus codigos\n\n'
        + 'Tambien puedes usar el comando /help para mostrarte informacion de contacto para el soporte tecnico 👾', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Autoventa", callback_data: "av" },
                    { text: "Preventa", callback_data: "pv" },
                    { text: "Reparto", callback_data: "rp" }],
            ]
        }
    })
})

bot.on('callback_query', async (ctx) => {
    let optioncb = ctx.callbackQuery.data
    let data = {}
    switch (optioncb) {
        case 'av':
            data = await selectionRouteAv()
            break;
        case 'pv':
            data = await selectionRoutePv()
            break;
        case 'rp':
            data = await selectionRouteRp()
            break;
        default:
            ctx.reply('Verificando codigo de ruta 🖥️')
            data = await selectionRouteNumber(optioncb)
            break;
    }
    ctx.reply(data.message, data.options)
})


bot.help((ctx) => {
    if (validUsers.indexOf(String(ctx.update.message.from.id)) == -1) return
    ctx.setChatMenuButton()
    ctx.reply('Seccion de ayuda de ComerBot 🤖\n\n'
        + 'Hemos sido infomados sobre tus dudas sobre el bot, pronto nos pondremos en contacto contigo. \n\n -SoporteTi 🖥️')
})

bot.launch()