const userValidation = (users, name) => {    
    if (users.length<1) return false;    
    return users.reduce((prev, user) => {        
        if (user.name === name) {       
            console.log("here!")     
            prev = true};
        prev = prev || false;
        return prev
    }, false);    
}

export default userValidation