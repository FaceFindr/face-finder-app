import Cookies from 'js-cookie';

export default function getAuthHeaders (){
    console.log(headers)
    const jwtToken = Cookies.get('jwtToken');
    let headers = {};
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    console.log(headers)
    return headers;
}