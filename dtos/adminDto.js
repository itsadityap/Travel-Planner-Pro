class adminDto {
    id;
    name;
    email;

    constructor(admin) {
        this.id = admin._id;
        this.name = admin.name;
        this.email = admin.email;
    }
}

module.exports = adminDto;