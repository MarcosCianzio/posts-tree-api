"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entity/user.entity");
const type_graphql_1 = require("type-graphql");
const user_input_1 = require("../../input/user.input");
const user_response_1 = require("../../responses/user.response");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserMutation = class UserMutation {
    async register({ email, password }, { req }) {
        const userAlreadyExist = await user_entity_1.User.findOne({ email });
        if (userAlreadyExist) {
            return {
                errors: [
                    {
                        message: "user already exists",
                        field: "email",
                    },
                ],
            };
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await user_entity_1.User.create({
            email,
            password: hashedPassword,
        }).save();
        req.session.userId = user.id;
        return { user };
    }
    async login({ email, password }, { req }) {
        const user = await user_entity_1.User.findOne({ email });
        if (!user) {
            return {
                errors: [
                    {
                        message: "user doesn't exist",
                        field: "email",
                    },
                ],
            };
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return {
                errors: [
                    {
                        message: "Invalid password",
                        field: "password",
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return { user };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_response_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserMutation.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_response_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("values")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserMutation.prototype, "login", null);
UserMutation = __decorate([
    (0, type_graphql_1.Resolver)()
], UserMutation);
//# sourceMappingURL=user.mutation.js.map