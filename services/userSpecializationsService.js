const UserSpecializations = require("../models/UserSpecializations")

class UserSpecializationsService {
    async create(id, specialization) {
        
            const userSpecializations = await UserSpecializations.create({
                userId: id,
                specializationId: specialization
            });

            userSpecializations.save();
    }
}

module.exports = new UserSpecializationsService;