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
exports.UrlResolver = void 0;
const Url_1 = require("../entities/Url");
const type_graphql_1 = require("type-graphql");
const nanoid_1 = require("nanoid");
let UrlResolver = class UrlResolver {
    async Urls() {
        return Url_1.Url.find({
            order: {
                id: 'DESC',
            },
        });
    }
    async getUrl(shortUrl) {
        return Url_1.Url.findOne({ where: { shortUrl } });
    }
    async createShorterUrl(longUrl) {
        const shortUrl = nanoid_1.nanoid(7);
        console.log(shortUrl);
        return Url_1.Url.create({
            longUrl,
            shortUrl,
        }).save();
    }
};
__decorate([
    type_graphql_1.Query(() => [Url_1.Url], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "Urls", null);
__decorate([
    type_graphql_1.Query(() => Url_1.Url, { nullable: true }),
    __param(0, type_graphql_1.Arg('shortUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "getUrl", null);
__decorate([
    type_graphql_1.Mutation(() => Url_1.Url),
    __param(0, type_graphql_1.Arg('longUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "createShorterUrl", null);
UrlResolver = __decorate([
    type_graphql_1.Resolver(Url_1.Url)
], UrlResolver);
exports.UrlResolver = UrlResolver;
//# sourceMappingURL=url.js.map