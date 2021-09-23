class Validate{

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
        if(typeof(docInfo.DoctorFeesPerVisit)!=='number'||typeof(docInfo.DoctorConsultationFees)!=='number'){
            return false;
        }
        return true;
    }

}

module.exports = Validate;