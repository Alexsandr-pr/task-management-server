const userService = require('../services/userService');
const {validationResult} = require("express-validator");


class UserController {

    async registration(req, res, next) {
            const errors = validationResult(req);
            
            if(!errors.isEmpty()) {
                return res.json({message: "Ошибка при валидации"})
            }

            const {email, password, firstName, lastName, specialization} = req.body;

            const userData = await userService.registration(req, email, password, firstName, lastName, specialization);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        
    }

    async login(req, res) {
        
        const {email, password} = req.body;

        const userData = await userService.login(email, password);

    
        res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        
        return res.json(userData);
    }

    async logout(req, res) {
        try {

            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);

            res.clearCookie("refreshToken");

            return res.json(token);

        }catch(e) {
            console.log(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json(userData);
        } catch(e) {
            next(e)
        }      
    }

    async getUsers(req, res) {
        try {
            
        } catch(e) {
            
        }
    }

    async forgotPassword(req, res) {
        try {
            
        } catch(e) {
            next(e)
        }
    }

    async changePasswordForgot(req, res) {
        try {
            
        } catch(e) {
            
        }
    }

    async changePassword(req, res) {
        try {
            
        } catch(e) {
            
        }
    }

    async addImage(req, res) {
        try {
           
        } catch(e) {
            
        }
    }

    async deleteAvatar(req, res, ) {
        try {
            
        } catch(e) {
            
        }
    }

    async deleteUser(req, res) {
        try {

        }catch(e) {

        }
    }
}

module.exports = new UserController();
