const specializationService = require("../services/specializationService");

class SpecializationController {
    async create(req,res){
        try {
            const { name } = req.body;
            
            await specializationService.create(name);

            return res.json({message: "Специализация создана"});
        }catch(e) {
            console.log(e)
        }
    }
}

module.exports = new SpecializationController;