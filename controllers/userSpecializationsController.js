
const UserSpecializations = require("../services/userSpecializationsService")

class UserSpecializationsController {
    async create(id, specialization) {
        try {
            await UserSpecializations.create(id, specialization);
        }  catch(e) {
            console.log(e)
        }
    }
}


module.exports = new UserSpecializationsController;