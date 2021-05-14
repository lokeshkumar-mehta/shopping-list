const doHttpRequest = (path, method, body={}) => {
    const url = 'http://localhost:8000/';

    const reqObject = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST') {
        console.log(body);
        reqObject.body = JSON.stringify(body);
    }

    return fetch(`${url}${path}`, reqObject).then(response => {
        const fetchResponse = response.json();

        if (response.status >= 400 && response.status <= 599 ) {
            throw "Some issue";
        }

        return fetchResponse;
    });
};

export default doHttpRequest;