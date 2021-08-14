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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitResolver = void 0;
const Visit_1 = require("../entities/Visit");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let VisitResolver = class VisitResolver {
    async urlVisits(id) {
        return Visit_1.Visit.find({ where: { urlId: id }, take: 5 });
    }
    async countPlusOne(id) {
        const urlVisits = await Visit_1.Visit.find({ where: { urlId: id } });
        let date = new Date();
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        const today = date.toISOString().split('T')[0];
        if (urlVisits.length > 0) {
            const res = urlVisits.find((ele) => ele.date == today);
            if (res) {
                const result = await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Visit_1.Visit)
                    .set({ count: (res === null || res === void 0 ? void 0 : res.count) + 1 })
                    .where('urlId = :id and date = :today', {
                    id,
                    today,
                })
                    .returning('*')
                    .execute();
                return result.raw[0];
            }
            else {
                return Visit_1.Visit.create({
                    date: today,
                    urlId: id,
                    count: 1,
                }).save();
            }
        }
        else {
            return Visit_1.Visit.create({
                date: today,
                urlId: id,
                count: 1,
            }).save();
        }
    }
    async genCount(id) {
        let date = new Date();
        const today = date.toLocaleDateString();
        const re = await Visit_1.Visit.create({
            date: today,
            urlId: id,
        }).save();
        return re;
    }
    async allVisits() {
        return Visit_1.Visit.find({});
    }
};
__decorate([
    type_graphql_1.Query(() => [Visit_1.Visit]),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "urlVisits", null);
__decorate([
    type_graphql_1.Mutation(() => Visit_1.Visit),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "countPlusOne", null);
__decorate([
    type_graphql_1.Mutation(() => Visit_1.Visit),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "genCount", null);
__decorate([
    type_graphql_1.Query(() => [Visit_1.Visit]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VisitResolver.prototype, "allVisits", null);
VisitResolver = __decorate([
    type_graphql_1.Resolver(Visit_1.Visit)
], VisitResolver);
exports.VisitResolver = VisitResolver;
//# sourceMappingURL=visit.js.map