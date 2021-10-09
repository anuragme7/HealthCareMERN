import axios from 'axios';

export class TempStaffService {

    authUser(user){
        let response =  axios.post('http://localhost:9080/api/app/login', user, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    getData(token){
        let response = axios.get('http://localhost:9080/api/tmpstf/get',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getDataById(token,id){
        let response = axios.get(`http://localhost:9080/api/tmpstf/get/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    postData(data){
        let response = axios.post(`http://localhost:9080/api/tmpstf/post`,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    deleteData(token,id){
        let response = axios.delete(`http://localhost:9080/api/tmpstf/delete/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}