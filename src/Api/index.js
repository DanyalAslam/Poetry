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
    }
}


export default Api