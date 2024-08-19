const { getCodRoute } = require('./querys.js')

const selectionRouteNumber = async (routeNumber) => {
    let data = {}
    let regex = /^[0-9]+/
    if (!regex.test(routeNumber)) {
        data = {
            message: 'Advertencia!⚠️\n\n'
                + 'No se proporciono una ruta validad, por favor intentelo de nuevo 👉 /start',
            options: {}
        }
    } else {
        let codRoutes = await getCodRoute(routeNumber)
        if (codRoutes.length == 0) {
            data = {
                message: 'Lo sentimos! 😕\n\n'
                    + 'No se encontraron codigos para la ruta seleccionada\n\n'
                    + 'Inicia de nuevo presionando aqui 👉 /start',
                options: {}
            }
        } else {
            textcod = ''
            codRoutes.forEach(el => {
                textcod += el + '\n'
            });
            data = {
                message: 'Codigos Disponibles para la Ruta '
                    + routeNumber + ' 🚚:\n\n'
                    + textcod + '\nEncantado de ayudar 🤖'
                    + 'Inicia de nuevo presionando aqui 👉 /start',
                options: {}
            }
        }
    }
    return data
}

module.exports = { selectionRouteNumber }