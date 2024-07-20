const User = require('../models/User');
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

    async users(req, res) {
        const userData = await User.find();
        return res.json(userData)
    }

    async forgotPassword(req, res, next) {
        try {
            const {email} = req.body;
            
            const code = await userService.forgotPassword(email);
            return res.json(code)
        } catch(e) {
            next(e)
        }
    }

    async changePasswordForgot(req, res, next) {
        
        try {
            const {email, password} = req.body;
        
            await userService.changePasswordForgot(email, password);

            return res.json({message: "Вы поменяли пароль"});
        } catch(e) {
            
        }

        
    }

    async changePassword(req, res, next) {
        try {
            const {password, email, newPassword} = req.body;
            
            const userData = await userService.changePassword(password, newPassword, email);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);

        } catch(e) {
            next(e)
        }
    }

}

module.exports = new UserController();
