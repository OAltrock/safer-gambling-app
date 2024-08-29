const userValidation = (users, name) => {    
    if (users.length<1) return false;    
    if (name.length>100) return true;
    return users.reduce((prev, user) => {        
        if (user.name === name) { 
            prev = true};
        prev = prev || false;
        return prev
    }, false);    
}

export default userValidation