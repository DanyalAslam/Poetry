import config from './config'


const Api = {
    get: (endPoint, success, error) => {

        let url = config.baseUrl + endPoint

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(_response => _response.json())
            .then(_jsonResponse => {

            

                if (_jsonResponse.message == "success") {
                    return success(_jsonResponse)
                }
                else {
                    return error(_jsonResponse.error)
                }
            })
            .catch(_err => {
             

                return error(_err.message)
            })
    },


    getPoetDB: (endPoint, success, error) => {

        let url = config.poetDBurl + endPoint

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(_response => _response.json())
            .then(_jsonResponse => {

                // console.log('json resp ', _jsonResponse);
 
                return success(_jsonResponse)

            })
            .catch(_err => {
                // console.log('erro ',_err.message);
                
                if(_err.message.includes("Unexpected end of input")){
                    return error('No internet')
                }

                return error(_err.message)
            })
    }
}


export default Api