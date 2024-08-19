const selectionRouteAv = async () => {
    let data = {
        message: 'Ahora Seleciona a cual ruta de Autoventas obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "AV34", callback_data: "34" },
                        { text: "AV36", callback_data: "36" }
                    ]
                ]
            }
        }
    }
    return data
}

const selectionRoutePv = async () => {
    let data = {
        message: 'Ahora Seleciona a cual ruta de Preventa obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "PV51", callback_data: "51" },
                        { text: "PV52", callback_data: "52" },
                        { text: "PV53", callback_data: "53" },
                        { text: "PV54", callback_data: "54" },
                        { text: "PV55", callback_data: "55" },
                        { text: "PV56", callback_data: "56" },
                        { text: "PV57", callback_data: "57" }
                    ]
                ]
            }
        }
    }
    return data
}

const selectionRouteRp = async () => {
    let data = {
        message: 'Ahora Seleciona a cual ruta de Reparto obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "RP71", callback_data: "71" },
                        { text: "RP72", callback_data: "72" },
                        { text: "RP73", callback_data: "73" },
                        { text: "RP74", callback_data: "74" },
                        { text: "RP75", callback_data: "75" },
                        { text: "RP76", callback_data: "76" },
                        { text: "RP77", callback_data: "77" }
                    ],
                ]
            }
        }
    }
    return data
}

module.exports = { selectionRouteAv, selectionRoutePv, selectionRouteRp }