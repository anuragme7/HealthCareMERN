Use Hospital;
-- Make Queries 
SELECT * from patient INNER JOIN doctor_patient_relation 
where patient.PatientId = doctor_patient_relation.PatientId;

SELECT * from doctor INNER JOIN doctor_patient_relation where 
doctor.DoctorId = doctor_patient_relation.DoctorId 
and doctor_patient_relation.PatientId=100;

delete from User where UserId ="Rc-7";