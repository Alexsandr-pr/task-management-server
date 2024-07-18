
const StudentProfile = require("../models/StudentProfile");

class StudentProfileServise {
    async create(id) {
        
            const studentProfile = await StudentProfile.create({userId: id});

            studentProfile.save();
        
    }
}

module.exports = new StudentProfileServise