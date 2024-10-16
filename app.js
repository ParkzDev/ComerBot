const tf = require('telegraf')
const { selectionRouteNumber } = require('./routenumber.js')
const { selectionRouteAv, selectionRoutePv, selectionRouteRp } = require('./routetype.js')
let routes =  [24,34,36,71,72,73,74,75,76,77,80,81,83,84];

const bot = new tf.Telegraf(process.env.TELEGRAM_TOKEN)
const validUsers =  process.env.TELEGRAM_USERS.split(',')

bot.start((ctx) => {
    if (validUsers.indexOf(String(ctx.update.message.from.id)) === -1) return
    ctx.reply('Hola, Soy ComerBot 🤖\n\n'
        + 'Estare ayudandote en el proceso de obtencion de Contraseñas de venta 💹💰 y generacion de supervisiones a rutas aleatorias\n\n'
        + 'Tambien puedes presionar aqui 👉 /help para mostrarte informacion de contacto para el soporte tecnico 👾', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Contraseñas", callback_data: "passwords" },
                    { text: "Supervision", callback_data: "ramdon" }]
            ]
        }
    })
})

bot.on('callback_query', async (ctx) => {
    let optioncb = ctx.callbackQuery.data
    let data
    switch (optioncb) {
        case 'passwords':
            data = {
                message:'Selecciona alguna de las opciones presentadas a continuacion para saber el tipo de ruta 🚚 a la cual obtendras sus codigos\n\n',
                options: {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Autoventa", callback_data: "av" },
                                { text: "Preventa", callback_data: "pv" },
                                { text: "Reparto", callback_data: "rp" }]
                        ]
                    }
                }
            }
            break
        case 'ramdon':
            data = {
                message: 'Ruta 🚚 para revision:\n\n'
                    + routes[~~(Math.random() * routes.length)] + '\n\nEncantado de ayudar 🤖\n\n'
                    + 'Inicia de nuevo presionando aqui 👉 /start',
                options: {}
            }
            break
        case 'av':
            data = await selectionRouteAv()
            break
        case 'pv':
            data = await selectionRoutePv()
            break
        case 'rp':
            data = await selectionRouteRp()
            break
        default:
            ctx.reply('Verificando codigo de ruta 🖥️')
            data = await selectionRouteNumber(optioncb)
            break
    }
    ctx.reply(data.message, data.options)
})


bot.help((ctx) => {
    if (validUsers.indexOf(String(ctx.update.message.from.id)) === -1) return
    ctx.setChatMenuButton()
    ctx.reply('Seccion de ayuda de ComerBot 🤖\n\n'
        + 'Hemos sido infomados sobre tus dudas sobre el bot, pronto nos pondremos en contacto contigo. \n\n -SoporteTi 🖥️')
})

bot.launch()