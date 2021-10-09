const showDepartment=(dept)=>{
    console.log(`In showDepartment action ${JSON.stringify(dept)}`);
    return {
        type: 'SHOW_DEPARTMENT', 
        dept
    };
};

export default showDepartment;