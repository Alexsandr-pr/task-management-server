const studentProfileService = require("../services/studentProfileService");

class StudentProfileController {
    async create(id) {
        try {
            await studentProfileService.create(id);

        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new StudentProfileController