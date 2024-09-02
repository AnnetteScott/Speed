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
exports.ArticleSchema = exports.Article = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Article = class Article {
};
exports.Article = Article;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        match: /^(http:\/\/|https:\/\/)[a-fA-F0-9]{24}$/,
    }),
    __metadata("design:type", String)
], Article.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Article.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Object)
], Article.prototype, "published_date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Article.prototype, "publisher", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Article.prototype, "volume", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [0, 1] }),
    __metadata("design:type", Number)
], Article.prototype, "submitted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [0, 1] }),
    __metadata("design:type", Number)
], Article.prototype, "moderated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [0, 1] }),
    __metadata("design:type", Number)
], Article.prototype, "analyzed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [0, 1] }),
    __metadata("design:type", Number)
], Article.prototype, "approved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: [0, 1] }),
    __metadata("design:type", Number)
], Article.prototype, "rejected", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DataView, default: Date.now }),
    __metadata("design:type", Object)
], Article.prototype, "updated_date", void 0);
exports.Article = Article = __decorate([
    (0, mongoose_1.Schema)()
], Article);
exports.ArticleSchema = mongoose_1.SchemaFactory.createForClass(Article);
//# sourceMappingURL=articles.schema.js.map