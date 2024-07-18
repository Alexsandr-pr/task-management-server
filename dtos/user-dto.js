module.exports = class UserDto {
    email;
    id;
    name;
    surname;
    role;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.name = model.name;
        this.surname = model.surname;
        this.role = model.role;
    }
}