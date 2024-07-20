const UserNotifications = require("../models/UserNotifications");

class UserNotificationServise {
    async create(id) {
        try {
            const userNotifications = await UserNotifications.create({userId: id});

            userNotifications.save();
        
        }  catch(e) {
            console.log(e)
        }
    }

    async getNotification(id) {
        
        return await UserNotifications.findOne({userId: id});
        
    }

    async change(id, data) {
        try {
            const { isMessage, isTaskUpdate, isTaskDeadline, isMentorHelp } = data;
            if (id && data) {
                const updatedNotification = await UserNotifications.findOneAndUpdate(
                    { userId: id },
                    {
                        $set: {
                            isMessage,
                            isTaskUpdate,
                            isTaskDeadline,
                            isMentorHelp
                        }
                    },
                    { new: true, useFindAndModify: false }
                );
    
                if (!updatedNotification) {
                    console.log(`Notification for user ${id} not found.`);
                }
            } else {
                console.log('Invalid id or data');
            }
        } catch (e) {
            console.error('Error updating notification:', e);
        }
    }

    async delete(id) {
        try {
            const deletedNotification = await UserNotifications.findOneAndDelete({ userId: id });
            
            if (deletedNotification) {
                console.log(`Notification for user ${id} deleted successfully.`);
            } else {
                console.log(`Notification for user ${id} not found.`);
            }
        } catch (e) {
            console.error('Error deleting notification:', e);
        }
    }
    
}

module.exports = new UserNotificationServise