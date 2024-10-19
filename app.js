const tf = require('telegraf')
const { selectionRouteNumber, selectionRouteNumber_change } = require('./routenumber.js')
const { selectionRouteAv, selectionRoutePv, selectionRouteRp } = require('./routetype.js')
let option_change = false;
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
                ,
                [ { text: "Cambio de contraseñas", callback_data: "change_password" } ]

            ]
        }
    })
})

bot.on('callback_query', async (ctx) => {
    let optioncb = ctx.callbackQuery.data
    let data
    let data_change_password
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
        case 'change_password':
            data_change_password = {
                message:'Selecciona alguna de las opciones presentadas a continuacion para saber el tipo de ruta 🚚 a la cual cambiarás su contraseña de venta 📝 \n\n',
                options: {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "Autoventa", callback_data: "av_change" },
                                { text: "Preventa", callback_data: "pv_change" },
                                { text: "Reparto", callback_data: "rp_change" }]
                        ]
                    }
                }
            }
            break
        case 'av':
            data =  await selectionRouteAv()
            break
        case 'pv':
            data = await selectionRoutePv()
            break
        case 'rp':
            data = await selectionRouteRp()
            break
        case 'av_change':
            data_change_password = await selectionRouteAv()
            option_change = true;
            break
        case 'pv_change':
            data_change_password = await selectionRoutePv()
            option_change = true;
            break
        case 'rp_change':
            data_change_password = await selectionRouteRp()
            option_change = true;
            break;
        default:
            ctx.reply('Verificando codigo de ruta 🖥️')
            if(option_change){
                data_change_password = await selectionRouteNumber_change(optioncb)    
                break
            }
            data = await selectionRouteNumber(optioncb)
            break
    }
    if(data){
        ctx.reply(data.message , data.options);
        option_change = false;
    }
    if(data_change_password){
        ctx.reply(data_change_password.message ,data_change_password.options)
    }
   
})


bot.help((ctx) => {
    if (validUsers.indexOf(String(ctx.update.message.from.id)) === -1) return
    ctx.setChatMenuButton()
    ctx.reply('Seccion de ayuda de ComerBot 🤖\n\n'
        + 'Hemos sido infomados sobre tus dudas sobre el bot, pronto nos pondremos en contacto contigo. \n\n -SoporteTi 🖥️')
})

bot.launch()