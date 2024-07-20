
const UserNotifications = require("../services/userNotificationService");

class UserNotificationsController {
    async create(id) {
        try {
            await UserNotifications.create(id);
        }  catch(e) {
            console.log(e)
        }
    }

    async getNotification(req, res) {
        
        const {id} = req.params;
        const data = await UserNotifications.getNotification(id);
        return res.json(data);
    }

    async change(req,res) {
        try {
            const {id, data} = req.body;
            
            await UserNotifications.change(id, data);

            return res.json({message: "Вы обновили успешно"})
        } catch(e) {
            console.log(e)
        }
    }

    async delete(id) {
        try {
            await UserNotifications.delete(id);
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new UserNotificationsController