const UserLocalization = require("../services/userLocalizationService");

class UserLocalizationController {
    async create(id) {
        try {
            await UserLocalization.create(id);
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserLocalizationController