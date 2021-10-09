const jwt = require("jsonwebtoken");
const jwtSettings = {
    jwtSecret: "utfsbibombmwwmb0987887890bmwwmbmobibsftu",
};
class Validate{
    
    async validateToken(token){
        try{
            let decoded= await jwt.verify(
                token,
                jwtSettings.jwtSecret);
            return decoded;    

        }catch(err){
            return false;
        
        }
    }

    validateDoctor(docInfo){
        let letters = /^[A-Za-z]+$/;
        if(docInfo===undefined){
            return false;
        }
        if(docInfo.DoctorId===undefined||docInfo.DoctorId.slice(0,3)!=="Dr-"){
            return false;
        }
        if(docInfo.DoctorFname===undefined||typeof(docInfo.DoctorFname)!=='string'||!(docInfo.DoctorFname.match(letters))){
            return false;
        }
        if(docInfo.DoctorLname===undefined||typeof(docInfo.DoctorLname)!=='string'||!(docInfo.DoctorLname.match(letters))){
            return false;
        }
        if(docInfo.DoctorMname!==undefined){
            if(typeof(docInfo.DoctorMname)!=='string'||!(docInfo.DoctorMname.match(letters))){
                return false;
            }
        }
        if(docInfo.Address===undefined||docInfo.City===undefined||docInfo.DateOfBirth===undefined||docInfo.Gender===undefined||docInfo.Email===undefined||docInfo.Specialization===undefined||docInfo.MobNo===undefined||docInfo.EmergencyContact===undefined||docInfo.IdCard===undefined||docInfo.DoctorFeesPerVisit===undefined||docInfo.DoctorConsultationFees===undefined){
            return false;
        }
        console.log(typeof(docInfo.DoctorFeesPerVisit));
        if(typeof(parseInt(docInfo.DoctorFeesPerVisit))!=='number'||typeof(parseInt(docInfo.DoctorConsultationFees))!=='number'){
            return false;
        }
        return true;
    }

    validatePatient(patientInfo){
        let letters = /^[A-Za-z]+$/;
        if(patientInfo===undefined){
            return false;
        }
        if(patientInfo.PatientFname===undefined||typeof(patientInfo.PatientFname)!=='string'||!(patientInfo.PatientFname.match(letters))){
            return false;
        }
        if(patientInfo.PatientLname===undefined||typeof(patientInfo.PatientLname)!=='string'||!(patientInfo.PatientLname.match(letters))){
            return false;
        }
        if(patientInfo.PatientMname!==undefined){
            if(typeof(patientInfo.PatientMname)!=='string'||!(patientInfo.PatientMname.match(letters))){
                return false;
            }
        }
        if(patientInfo.Roomno!==undefined){
            if(typeof(patientInfo.Roomno)!=='string'){
                return false;
            }
        }
        if(patientInfo.Address===undefined||patientInfo.City===undefined||patientInfo.DateOfBirth===undefined||patientInfo.Gender===undefined||patientInfo.Disease===undefined||patientInfo.IPD_OPD===undefined){
            return false;
        }
        return true;
    }

    // IPD_OPD,


    validateNurse(nurseInfo){
        let letters = /^[A-Za-z]+$/;
        if(nurseInfo===undefined){
            return false;
        }
        if(nurseInfo.NurseId===undefined||nurseInfo.NurseId.slice(0,3)!=="Nr-"){
            return false;
        }
        if(nurseInfo.NurseFname===undefined||typeof(nurseInfo.NurseFname)!=='string'||!(nurseInfo.NurseFname.match(letters))){
            return false;
        }
        if(nurseInfo.NurseLname===undefined||typeof(nurseInfo.NurseLname)!=='string'||!(nurseInfo.NurseLname.match(letters))){
            return false;
        }
        if(nurseInfo.WardNo!==undefined){
            if(typeof(parseInt(nurseInfo.WardNo))!=='number'){
                return false;
            }
        }
        if(nurseInfo.Address===undefined||nurseInfo.City===undefined||nurseInfo.DateOfBirth===undefined||nurseInfo.Gender===undefined||nurseInfo.Email===undefined||nurseInfo.MobNo===undefined||nurseInfo.EmergencyContact===undefined||nurseInfo.IdCard===undefined||nurseInfo.NurseFeesPerDay===undefined||typeof(parseInt(nurseInfo.NurseFeesPerDay))!=='number'){
            return false;
        }
        return true;
    }

    validateWardBoy(wardboyInfo){
        let letters = /^[A-Za-z]+$/;
        if(wardboyInfo===undefined){
            return false;
        }
        if(wardboyInfo.WardBoyId===undefined||wardboyInfo.WardBoyId.slice(0,3)!=="Wr-"){
            return false;
        }
        if(wardboyInfo.WardBoyFname===undefined||typeof(wardboyInfo.WardBoyFname)!=='string'||!(wardboyInfo.WardBoyFname.match(letters))){
            return false;
        }
        if(wardboyInfo.WardBoyLname===undefined||typeof(wardboyInfo.WardBoyLname)!=='string'||!(wardboyInfo.WardBoyLname.match(letters))){
            return false;
        }
        if(wardboyInfo.WardNo!==undefined){
            if(typeof(wardboyInfo.WardNo)!=='string'){
                return false;
            }
        }
        if(wardboyInfo.Address===undefined||wardboyInfo.City===undefined||wardboyInfo.DateOfBirth===undefined||wardboyInfo.Gender===undefined||wardboyInfo.Email===undefined||wardboyInfo.MobNo===undefined||wardboyInfo.EmergencyContact===undefined||wardboyInfo.IdCard===undefined||wardboyInfo.WardBoySalary===undefined||typeof(parseInt(wardboyInfo.WardBoySalary))!=='number'){
            return false;
        }
        return true;
    
    }
    validateRoom(roomInfo){
        if(roomInfo===undefined){
            return false;
        }
        if(roomInfo.RoomNo===undefined){
            return false;
        }
        if(roomInfo.WardNo===undefined||typeof(roomInfo.WardNo)!=='string'){
            return false;
        }
        if(roomInfo.RoomType===undefined||typeof(roomInfo.RoomType)!=='string'){
            return false;
        }
        if(roomInfo.RoomFeesPerDay===undefined||typeof(parseInt(roomInfo.RoomFeesPerDay))!=='number'){
            return false;
        }
        return true;
    
    }
    validateWard(wardInfo){
        if(wardInfo===undefined){
            return false;
        }
        if(wardInfo.WardType===undefined||typeof(wardInfo.WardType)!=='string'){
            return false;
        }
        return true;
    
    }

    validateTempUser(userInfo){
        if(userInfo===undefined){
            return false;
        }
        let mail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let pass = /(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if(userInfo.Email===undefined||!userInfo.Email.match(mail)){
            return false;
        }
        if(userInfo.Password===undefined||!userInfo.Password.match(pass)){
            return false;
        }
        return true;

    }

    validateTempStaff(userInfo){

        if(userInfo===undefined){
            return false;
        }
        let mail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(userInfo.Email===undefined||!userInfo.Email.match(mail)){
            return false;
        }
        let letters = /^[A-Za-z]+$/;
        if(userInfo.Fname===undefined||!(userInfo.Fname.match(letters))){
            return false;
        }
        if(userInfo.Lname===undefined||!(userInfo.Lname.match(letters))){
            return false;
        }
        if(userInfo.Mname!==undefined){
            if(!(userInfo.Mname.match(letters))){
                return false;
            }
        }
        if(userInfo.Address===undefined||userInfo.City===undefined||userInfo.DateOfBirth===undefined||userInfo.Gender===undefined||userInfo.RoleId===undefined||typeof(parseInt(userInfo.RoleId))!=='number'){
            return false;
        }
        console.log("Returning trueeeeeeee");
        return true;
    }

    validateStaff(staffInfo){

        if(staffInfo===undefined){
            return false;
        }
        let mail=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(staffInfo.Email===undefined||!staffInfo.Email.match(mail)){
            return false;
        }
        let letters = /^[A-Za-z]+$/;
        if(staffInfo.Fname===undefined||!(staffInfo.Fname.match(letters))){
            return false;
        }
        if(staffInfo.Lname===undefined||!(staffInfo.Lname.match(letters))){
            return false;
        }
        if(staffInfo.Mname!==undefined){
            if(!(staffInfo.Mname.match(letters))){
                return false;
            }
        }
        if(staffInfo.Address===undefined||staffInfo.City===undefined||staffInfo.DateOfBirth===undefined||staffInfo.Gender===undefined||staffInfo.RoleId===undefined||typeof(parseInt(staffInfo.RoleId))!=='number'){
            return false;
        }
        return true;
    }

}

module.exports = Validate;