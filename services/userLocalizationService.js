const UserLocalization = require("../models/UserLocalization");

class UserLocalizationServise {
    async create(id) {
        
            const userLocalization = await UserLocalization.create({userId: id});

            userLocalization.save();
        
        
    }
}

module.exports = new UserLocalizationServise