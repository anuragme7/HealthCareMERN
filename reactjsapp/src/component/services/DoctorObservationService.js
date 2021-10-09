import axios from 'axios';

export class DoctorObservationService {

    getDataById(token,data){
        let response = axios.post(`http://localhost:9080/api/docobs/get/`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    postData(token,data){
        let response = axios.post(`http://localhost:9080/api/docobs/post`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    putData(token,data,id){
        let response = axios.put(`http://localhost:9080/api/docobs/put/${id}`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    deleteData(token,id){
        let response = axios.delete(`http://localhost:9080/api/docobs/delete/${id}`,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}