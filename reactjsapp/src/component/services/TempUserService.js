import axios from 'axios';

export class TempUserService {

    authUser(user){
        let response =  axios.post('http://localhost:9080/api/app/login', user, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    getRoles(){
        let response = axios.get('http://localhost:9080/api/tmpusr/getroles',{
            
        });
        return response;
    }
    getData(token){
        let response = axios.get('http://localhost:9080/api/tmpusr/get',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getDataById(token,id){
        let response = axios.get(`http://localhost:9080/api/tmpusr/get/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    postData(data){
        let response = axios.post(`http://localhost:9080/api/tmpusr/post`,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    checkUser(data){
        let response = axios.post(`http://localhost:9080/api/tmpusr/check`,data,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    deleteData(token,id){
        let response = axios.delete(`http://localhost:9080/api/tmpusr/delete/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}