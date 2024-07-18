const Specialization = require("../models/Specialization");

class SpecializationService {
    async create(name){
        try {
            const specialization = await Specialization.create({name});

            specialization.save();
        }catch(e) {

        }
    }
}

module.exports = new SpecializationService;