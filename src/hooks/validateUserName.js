const userValidation = (users, name) => {    
    if (users.length<1) return users.length<1;    
    return users.reduce((_, user) => {        
        if (user.name === name) {            
            return user.name === name};
        return false;
    }, false);    
}

export default userValidation