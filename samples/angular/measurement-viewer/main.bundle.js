webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div>\n\t<app-imgview></app-imgview>\n</div>\n<div>\n\t<app-switchbank></app-switchbank>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_imgview_imgview_component__ = __webpack_require__("../../../../../src/app/components/imgview/imgview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_switchbank_switchbank_component__ = __webpack_require__("../../../../../src/app/components/switchbank/switchbank.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_switchstates_switchstates_service__ = __webpack_require__("../../../../../src/app/service/switchstates/switchstates.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_imgview_imgview_component__["a" /* ImgviewComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_switchbank_switchbank_component__["a" /* SwitchbankComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__service_switchstates_switchstates_service__["a" /* SwitchstatesService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/imgview/imgview.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img\n{\n    width: 1200px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/imgview/imgview.component.html":
/***/ (function(module, exports) {

module.exports = "<img src='{{fPath}}'>"

/***/ }),

/***/ "../../../../../src/app/components/imgview/imgview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgviewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_switchstates_switchstates_service__ = __webpack_require__("../../../../../src/app/service/switchstates/switchstates.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImgviewComponent = /** @class */ (function () {
    function ImgviewComponent(fSwitchStates) {
        var _this = this;
        this.fSwitchStates = fSwitchStates;
        this.kDefaultPath = '/assets/img/dc-00000.png';
        this.kHead = '/assets/img/dc-';
        this.kTail = '.png';
        this.fSwitchStates.fNotifier.subscribe(function (note) {
            _this._notifyChange();
        });
    }
    ImgviewComponent.prototype.ngOnInit = function () {
        this.fPath = this.kDefaultPath;
    };
    ImgviewComponent.prototype._notifyChange = function () {
        var n;
        var i;
        var s;
        var p;
        n = this.fSwitchStates.getNumStates();
        if (n >= 1) {
            p = this.kHead;
            for (i = 0; i < n; i++) {
                s = this.fSwitchStates.getState(i);
                p += s ? '1' : '0';
            }
            p += this.kTail;
        }
        else {
            p = this.kDefaultPath;
        }
        this.fPath = p;
    };
    ImgviewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-imgview',
            template: __webpack_require__("../../../../../src/app/components/imgview/imgview.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/imgview/imgview.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_switchstates_switchstates_service__["a" /* SwitchstatesService */]])
    ], ImgviewComponent);
    return ImgviewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/switchbank/switchbank.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td\n{\n    width: 1.5em;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/switchbank/switchbank.component.html":
/***/ (function(module, exports) {

module.exports = "<table>\n\t<tr>\n\t    <td><input type=\"checkbox\" [(ngModel)]=\"fR[4]\" (change)=\"update (4)\"/></td>\n\t    <td><input type=\"checkbox\" [(ngModel)]=\"fR[3]\" (change)=\"update (3)\"/></td>\n\t    <td><input type=\"checkbox\" [(ngModel)]=\"fR[2]\" (change)=\"update (2)\"/></td>\n\t    <td><input type=\"checkbox\" [(ngModel)]=\"fR[1]\" (change)=\"update (1)\"/></td>\n\t    <td><input type=\"checkbox\" [(ngModel)]=\"fR[0]\" (change)=\"update (0)\"/></td>\n\t</tr>\n\t<tr>\n\t    <td>R1</td>\n\t    <td>R2</td>\n\t    <td>R3</td>\n\t    <td>R4</td>\n\t    <td>R5</td>\n\t</tr>\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/components/switchbank/switchbank.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwitchbankComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_switchstates_switchstates_service__ = __webpack_require__("../../../../../src/app/service/switchstates/switchstates.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SwitchbankComponent = /** @class */ (function () {
    function SwitchbankComponent(fSwitchStates) {
        this.fSwitchStates = fSwitchStates;
    }
    SwitchbankComponent.prototype.ngOnInit = function () {
        this.fR = [false, false, false, false, false];
    };
    SwitchbankComponent.prototype.update = function (i) {
        this.fSwitchStates.setState(this.fR[i], i);
    };
    SwitchbankComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-switchbank',
            template: __webpack_require__("../../../../../src/app/components/switchbank/switchbank.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/switchbank/switchbank.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__service_switchstates_switchstates_service__["a" /* SwitchstatesService */]])
    ], SwitchbankComponent);
    return SwitchbankComponent;
}());



/***/ }),

/***/ "../../../../../src/app/service/switchstates/notification.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
var Notification = /** @class */ (function () {
    function Notification() {
    }
    return Notification;
}());



/***/ }),

/***/ "../../../../../src/app/service/switchstates/switchbank.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Switchbank; });
var Switchbank = /** @class */ (function () {
    function Switchbank() {
        this.fR = [
            false,
            false,
            false,
            false,
            false
        ];
    }
    return Switchbank;
}());



/***/ }),

/***/ "../../../../../src/app/service/switchstates/switchstates.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SwitchstatesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__switchbank__ = __webpack_require__("../../../../../src/app/service/switchstates/switchbank.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification__ = __webpack_require__("../../../../../src/app/service/switchstates/notification.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SwitchstatesService = /** @class */ (function () {
    function SwitchstatesService() {
        this.fSwitches = new __WEBPACK_IMPORTED_MODULE_2__switchbank__["a" /* Switchbank */]();
        this.fNotifications = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["a" /* Subject */]();
        this.fNotifier = this.fNotifications.asObservable();
    }
    SwitchstatesService.prototype.setState = function (state, i) {
        var notification;
        this._assertIndex(i);
        this.fSwitches.fR[i] = state;
        notification = new __WEBPACK_IMPORTED_MODULE_3__notification__["a" /* Notification */]();
        this.fNotifications.next(notification);
    };
    SwitchstatesService.prototype.getNumStates = function () {
        return this.fSwitches.fR.length;
    };
    SwitchstatesService.prototype.getState = function (i) {
        this._assertIndex(i);
        return this.fSwitches.fR[i];
    };
    SwitchstatesService.prototype._assertIndex = function (i) {
        var n;
        n = this.fSwitches.fR.length;
        if (i < 0) {
            throw new Error('Index too small. Must be in: [0, ' + n + '[. Given ' + i);
        }
        else if (i >= n) {
            throw new Error('Index too large. Must be in: [0, ' + n + '[. Given ' + i);
        }
    };
    SwitchstatesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SwitchstatesService);
    return SwitchstatesService;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map