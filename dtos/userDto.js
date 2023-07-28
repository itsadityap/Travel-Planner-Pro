class UserDto{

    id;
    userName;
    name;
    email;

    constructor(user){
        this.id = user._id;
        this.userName = user.userName;
        this.name = user.name;
        this.email = user.email;
    }
}

module.exports = UserDto;