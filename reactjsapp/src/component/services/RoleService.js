import axios from 'axios';

export class RoleService {

    authUser(user){
        let response =  axios.post('http://localhost:9080/api/role/login', user, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    getData(token){
        let response = axios.get('http://localhost:9080/api/role/get',{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
    postRoleData(token,data){
        let response = axios.post(`http://localhost:9080/api/role/post`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    postUserData(token,data){
        let response = axios.post(`http://localhost:9080/api/role/user/post`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    postUserInRoleData(token,data){
        let response = axios.post(`http://localhost:9080/api/role/userinrole/post`,data,{
            headers:{
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}