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
        this.createRoot = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.mkdir(this.projectRoot, { recursive: true })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.loop = function (templatePath, workingDirr) { return __awaiter(_this, void 0, void 0, function () {
            var filesToCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(templatePath)];
                    case 1:
                        filesToCreate = _a.sent();
                        this.createFiles(templatePath, workingDirr, filesToCreate);
                        return [2 /*return*/];
                }
            });
        }); };
        this.createFiles = function (templatePath, workingDirr, filesToCreate) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                filesToCreate.forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                    var origFilePath, origFileHandle, stat, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                origFilePath = templatePath + "/" + file;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, fs_1.promises.open(origFilePath, 'r')];
                            case 2:
                                origFileHandle = _a.sent();
                                return [4 /*yield*/, origFileHandle.stat()];
                            case 3:
                                stat = _a.sent();
                                if (stat.isDirectory()) {
                                    this.handleDirectory(origFilePath, workingDirr, file);
                                }
                                else {
                                    this.handleFile(origFileHandle, workingDirr, file);
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                error_2 = _a.sent();
                                console.error(error_2);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); };
        this.handleDirectory = function (origFilePath, workingDirr, file) { return __awaiter(_this, void 0, void 0, function () {
            var newDirPath;
            return __generator(this, function (_a) {
                newDirPath = this.projectRoot + "/" + workingDirr + "/" + file;
                try {
                    fs_1.promises.mkdir(newDirPath);
                }
                finally {
                    this.loop(origFilePath, workingDirr + "/" + file);
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        }); };
        this.handleFile = function (origFileHandle, workingDirr, file) { return __awaiter(_this, void 0, void 0, function () {
            var newFilePath, contents, newHandle, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Fix issue with npm renamin .gitignorefiles.
                        if (file === '.npmignore')
                            file = '.gitignore';
                        newFilePath = this.projectRoot + "/" + workingDirr + "/" + file;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, origFileHandle.readFile('utf8')];
                    case 2:
                        contents = _a.sent();
                        return [4 /*yield*/, fs_1.promises.open(newFilePath, 'w')];
                    case 3:
                        newHandle = _a.sent();
                        newHandle.writeFile(contents, 'utf8');
                        if (!(origFileHandle !== undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, origFileHandle.close()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(newHandle !== undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, newHandle.close()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.projectChoice = answers['projectChoice'];
        this.projectName = answers['projectName'];
        this.templateRoot = __dirname + "/templates/" + this.projectChoice;
        this.projectRoot = process.cwd() + "/" + this.projectName;
        this.createRoot();
        this.loop(this.templateRoot, this.projectName);
    }
    return MoveFiles;
}());
exports.MoveFiles = MoveFiles;
