const selectionRouteAv = async () => {
    return {
        message: 'Ahora Seleciona a cual ruta de Autoventas obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "AV10", callback_data: "10" },
                        { text: "AV11", callback_data: "11" },
                        { text: "AV12", callback_data: "12" },
                        { text: "AV13", callback_data: "13" }
                    ],
                    [
                        { text: "AV18", callback_data: "18" },
                        { text: "AV20", callback_data: "20" },
                        { text: "AV34", callback_data: "34" },
                        { text: "AV36", callback_data: "36" }
                    ]
                ]
            }
        }
    }
}

const selectionRoutePv = async () => {
    return {
        message: 'Ahora Seleciona a cual ruta de Preventa obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "PV51", callback_data: "51" },
                        { text: "PV52", callback_data: "52" },
                        { text: "PV53", callback_data: "53" },
                        { text: "PV54", callback_data: "54" }
                    ],
                    [
                        { text: "PV55", callback_data: "55" },
                        { text: "PV56", callback_data: "56" },
                        { text: "PV57", callback_data: "57" }
                    ]
                ]
            }
        }
    }
}

const selectionRouteRp = async () => {
     return {
        message: 'Ahora Seleciona a cual ruta de Reparto obtendras sus codigos🎫:',
        options: {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "RP71", callback_data: "71" },
                        { text: "RP72", callback_data: "72" },
                        { text: "RP73", callback_data: "73" },
                        { text: "RP74", callback_data: "74" }
                    ],
                    [
                        { text: "RP75", callback_data: "75" },
                        { text: "RP76", callback_data: "76" },
                        { text: "RP77", callback_data: "77" }
                    ],
                    [
                        { text: "RP80", callback_data: "80" },
                        { text: "RP81", callback_data: "81" },
                        { text: "RP82", callback_data: "82" },

                    ],
                    [
                        { text: "RP83", callback_data: "83" },
                        { text: "RP84", callback_data: "84" },
                        { text: "RP85", callback_data: "85" },

                    ],
                    [
                        { text: "RP86", callback_data: "86" },
                        
                    ]
                ]
            }
        }
    }
}

module.exports = { selectionRouteAv, selectionRoutePv, selectionRouteRp }