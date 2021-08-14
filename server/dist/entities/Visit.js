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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visit = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Url_1 = require("./Url");
let Visit = class Visit extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Visit.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'date' }),
    __metadata("design:type", String)
], Visit.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('int', { default: 0 }),
    __metadata("design:type", Number)
], Visit.prototype, "count", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Visit.prototype, "urlId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Url_1.Url, (url) => url.visits, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'urlId' }),
    __metadata("design:type", Url_1.Url)
], Visit.prototype, "url", void 0);
Visit = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Visit);
exports.Visit = Visit;
//# sourceMappingURL=Visit.js.map