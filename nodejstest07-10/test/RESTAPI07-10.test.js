const expect = require('chai').expect;

const request = require('request');


// let login ={
//     'UserId':'Ad-101',
//     'Password':'anurag.mehta'
// }

// //newUser value must be changed everytime to get the test running
// let newUser ={
//     Email:'test@test.test',
//     UserId:'Tst-01',
//     Password:'Test@123'
// }
// let expectedBody={message:`UserId ${newUser.UserId} registered successfully`};

//Incorrect Login details
let incorrectLogin ={
    'UserId':'Ad-10',
    'Password':'anurag.mehta'
}
let expectedIncorrectLogin={message:`UserId ${incorrectLogin.UserId} does not exists`};

let incorrectPasswordLogin ={
    'UserId':'Ad-101',
    'Password':'anurag.meht'
}
let expectedIncorrectPasswordLogin={message:`Incorrect Password`};


describe('The Test Suite for Testing Node.js Express REST APIs Assignment 07-10', () => {
   
    //this code can be run to check if the URL is alive and get token value

    // it('The APi must login with the credentials passed in body',(done)=>{
//         request.post("http://localhost:9080/api/role/login", {
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(login)
//         },
//         (error, response,body)=>{
//             expect(response.statusCode).to.equal(200);
//             console.log(JSON.stringify(body));
//             done();
//         });
    // });

    it('The APi must throw error for incorrect User Id',(done)=>{
        request.post("http://localhost:9080/api/role/login", {
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(incorrectLogin)
        },
        (error, response,body)=>{
            expect(response.statusCode).to.equal(401);
            expect(body).to.equal(JSON.stringify(expectedIncorrectLogin));
            console.log(JSON.stringify(body));

            done();
        });
    });

    it('The APi must throw error for incorrect User Id',(done)=>{
        request.post("http://localhost:9080/api/role/login", {
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(incorrectPasswordLogin)
        },
        (error, response,body)=>{
            expect(response.statusCode).to.equal(401);
            expect(body).to.equal(JSON.stringify(expectedIncorrectPasswordLogin));
            console.log(JSON.stringify(body));
            done();
        });
    });

    // un-comment to register new User

    // it('The APi must register new credentials passed in body',(done)=>{
//         request.post("http://localhost:9080/api/role/user/post", {
//         headers:{
//    //Pass the valid token (generate via the first test)
//             "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkluZm8iOnsiSWQiOiJBZC0xMDEiLCJFbWFpbCI6ImFkbWluQGFudXJhZy5jb20ifSwiaWF0IjoxNjMzNzkzNzc5LCJleHAiOjE2MzM3OTczNzl9.hIfm1glDUb8gM1-L-F5A24Z95va6roCPLm906dU1djU",
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(newUser)
//         },
//         (error, response,body)=>{
//             expect(response.statusCode).to.equal(200);
//             expect(body).to.equal(JSON.stringify(expectedBody));
//             console.log(JSON.stringify(body));
//             done();
//         });
    // });
});

