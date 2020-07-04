import Configuration from './@types/Configuration'
import Header from './@types/Header'

/**
 * Returns a list of headers
 * 
 * @param configuration
 */
export const getHeaders = function (configuration: Configuration){
    const headers: any = {}

    configuration.headers.forEach((header: Header) => {
        headers['Spb-' + header.name] = header.value
    })

    return headers
}