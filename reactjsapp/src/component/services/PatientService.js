import axios from 'axios';

export class PatientServiceCall {

    authUser(user){
        let response =  axios.post('http://localhost:9080/api/app/login', user, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    getData(token){
        let response = axios.get('http://localhost:9080/api/pat/get',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    getDataById(token,id){
        let response = axios.get(`http://localhost:9080/api/pat/get/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    postData(token,data){
        let response = axios.post(`http://localhost:9080/api/pat/post`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    putData(token,data,id){
        let response = axios.put(`http://localhost:9080/api/pat/put/${id}`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    deleteData(token,id){
        let response = axios.delete(`http://localhost:9080/api/pat/delete/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}