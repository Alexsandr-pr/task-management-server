
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./tokenService");
const mailService = require("./mailService");
const path = require("path");
const fs = require("fs");
const studentProfileController = require("../controllers/studentProfileController");
const userNotifications = require("../controllers/userNotificationController");
const userSpecializationsController = require("../controllers/userSpecializationsController");
const userLocalizationController = require("../controllers/userLocalizationController");
const ApiError = require("../exceptions/apiError")
const service = require("./service")


class UserService {

    async registration(req, email, password, firstName, lastName, specialization) {
        const candidate = await User.findOne({email});

        if(candidate) {
            throw new Error("Пользователь с таким email уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const activationLink = uuid.v4();

        const user = await User.create({
            email, 
            password: hashPassword, 
            activationLink, 
            firstName, 
            lastName
        });

        await mailService.sendActivationMail(req, email, firstName, lastName, `${process.env.API_URL}/api/user/activate/${activationLink}`);

        const userDto = new UserDto(user);
        await studentProfileController.create(userDto.id);
        await userNotifications.create(userDto.id);
        await userSpecializationsController.create(userDto.id, specialization);
        await userLocalizationController.create(userDto.id);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});

        if(!user) {
            throw  new Error("Неккоректная ссылка активации")
        }
        user.isEmailVerified = true;
        await user.save();
    }

    async login(email, password) {
        
            const user = await User.findOne({email});
            
            if(!user) {
                throw new Error('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            
            if(!isPassEquals) {
                if(user) {
                    
                    throw new Error("Неккоректный пароль, попробуйте еще раз.")
                }
            }

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto }
        
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken)  {
            throw ApiError.UnathorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError();
        }

        const user = await User.findById(userData.id);

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async getUsers() {
        const users = await User.find()
        return users;
    }

    async forgotPassword(email) {
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const code = await service.createCode();

            await mailService.sendPasswordForgot(email, code);

            return code;

        } catch(e) {
            throw e
        }
    }

    async changePasswordForgot(email, password) {
        
            const user = await User.findOne({email});

            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден, проверьте правильность ввода вашего email')
            }

            const hashPassword = await bcrypt.hash(password, 3);

            user.password = hashPassword;
            await user.save()
        
            return user;
    }

    async changePassword(password, newPassword, email) {
        
        try {
            const user = await User.findOne({email});
            if(!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            
            if(!isPassEquals) {
                throw ApiError.BadRequest("Ваш прежний пароль введен неправильно.")
            }

            const hashPassword = await bcrypt.hash(newPassword, 3);

            user.password = hashPassword;
            await user.save();

            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return { ...tokens, user: userDto }
        } catch(e) {
            throw e
        }

    }

    async addAvatar(req, file, id){
        try {
            
            const user = await User.findById({_id: id});

            const avatarName = uuid.v4() + ".jpg";

            if(user.avatar) {
                const filePath = path.join(req.pathStatic + "/user", user.avatar);
                fs.unlinkSync(filePath); 
            }

            const filePath = path.join(req.pathStatic + "/user", avatarName);

            await file.mv(filePath);

            user.avatar = avatarName;
            await user.save();

            const userDto = new UserDto(user)
            
            return  userDto;
        } catch(e){
            throw e
        }
    }

    async deleteAvatar (req, id){
        try {
            const user = await User.findById({_id:id}); 
            
            console.log(user)
            if (!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            }
            if(!user.avatar) {
                throw  ApiError.BadRequest('Аватар у пользователя не был найден!')
            }

            const filePath = path.join(req.pathStatic + "/user", user.avatar);

            fs.unlinkSync(filePath); 

            user.avatar = "";
            await user.save();

            const userDto = new UserDto(user)
            
            return userDto;

        } catch(e) {
            throw e
            
        }
    }

    async userDelete(id, refreshToken) {
        try {
            const user = await User.findById({_id: id}); 
            
            await tokenService.removeToken(refreshToken);
            
            await User.deleteOne({ _id: id })
        } catch(e) {
        }    
    }


    async deleteComment(userId, commentId) {
        try {
            const user = await User.findOne({_id: userId});
            if (!user) {
                throw  ApiError.BadRequest('Пользователь не был найден!')
            } 
            
            user.comments = await user.comments.filter(item => item._id !== commentId);
            await user.save();
            
        } catch(e) {
            throw e;
        }
    }
}



module.exports = new UserService;