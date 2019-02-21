"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var MoveFiles = /** @class */ (function () {
    function MoveFiles(answers) {
        var _this = this;
        this.run = function (templatePath, projectName) { return __awaiter(_this, void 0, void 0, function () {
            var filesToCreate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(templatePath)];
                    case 1:
                        filesToCreate = _a.sent();
                        filesToCreate.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var origFilePath, newFilePath, origHandle, stat, contents, newHandle, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        origFilePath = templatePath + "/" + file;
                                        newFilePath = this.currentDirr + "/" + projectName + "/" + file;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 10, , 11]);
                                        return [4 /*yield*/, fs_1.promises.open(origFilePath, 'r')];
                                    case 2:
                                        origHandle = _a.sent();
                                        return [4 /*yield*/, origHandle.stat()];
                                    case 3:
                                        stat = _a.sent();
                                        if (stat.isDirectory()) {
                                            try {
                                                fs_1.promises.mkdir(newFilePath);
                                            }
                                            finally {
                                                this.run(origFilePath, projectName + "/" + file);
                                                return [2 /*return*/];
                                            }
                                        }
                                        return [4 /*yield*/, origHandle.readFile('utf8')];
                                    case 4:
                                        contents = _a.sent();
                                        if (file === '.npmignore')
                                            file = '.gitignore';
                                        return [4 /*yield*/, fs_1.promises.open(newFilePath, 'w')];
                                    case 5:
                                        newHandle = _a.sent();
                                        newHandle.writeFile(contents, 'utf8');
                                        if (!(origHandle !== undefined)) return [3 /*break*/, 7];
                                        return [4 /*yield*/, origHandle.close()];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7:
                                        if (!(newHandle !== undefined)) return [3 /*break*/, 9];
                                        return [4 /*yield*/, newHandle.close()];
                                    case 8:
                                        _a.sent();
                                        _a.label = 9;
                                    case 9: return [3 /*break*/, 11];
                                    case 10:
                                        err_1 = _a.sent();
                                        console.error(err_1);
                                        return [3 /*break*/, 11];
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        this.projectChoice = answers['projectChoice'];
        this.projectName = answers['projectName'];
        this.templatePath = __dirname + "/templates/" + this.projectChoice;
        this.currentDirr = process.cwd();
        fs_1.promises.mkdir(this.currentDirr + "/" + this.projectName).then(function () {
            _this.run(_this.templatePath, _this.projectName);
        });
    }
    return MoveFiles;
}());
exports.MoveFiles = MoveFiles;
