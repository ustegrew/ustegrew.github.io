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

module.exports = "<div style=\"text-align:center\">\n    <router-outlet></router-outlet>\n</div>\n"

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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_lib_router_app_router_module__ = __webpack_require__("../../../../../src/app/components/lib/router/app-router.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_pages_tlanding_tlanding_component__ = __webpack_require__("../../../../../src/app/components/pages/tlanding/tlanding.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_pages_tdetails_tdetails_component__ = __webpack_require__("../../../../../src/app/components/pages/tdetails/tdetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_pages_tcart_tcart_component__ = __webpack_require__("../../../../../src/app/components/pages/tcart/tcart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_widgets_tlogo_tlogo_component__ = __webpack_require__("../../../../../src/app/components/widgets/tlogo/tlogo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_widgets_tgo_cart_button_tgo_cart_button_component__ = __webpack_require__("../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_widgets_tcategory_box_tcategory_box_component__ = __webpack_require__("../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_widgets_tsearch_tsearch_component__ = __webpack_require__("../../../../../src/app/components/widgets/tsearch/tsearch.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_widgets_tproduct_photo_frame_tproduct_photo_frame_component__ = __webpack_require__("../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_widgets_tview_details_button_tview_details_button_component__ = __webpack_require__("../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_widgets_tadd_to_cart_button_tadd_to_cart_button_component__ = __webpack_require__("../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_widgets_tproduct_details_panel_tproduct_details_panel_component__ = __webpack_require__("../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_pages_tfour_oh_four_tfour_oh_four_component__ = __webpack_require__("../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.ts");
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_pages_tlanding_tlanding_component__["a" /* TLandingComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_pages_tdetails_tdetails_component__["a" /* TDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_pages_tcart_tcart_component__["a" /* TCartComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_widgets_tlogo_tlogo_component__["a" /* TLogoComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_widgets_tgo_cart_button_tgo_cart_button_component__["a" /* TGoCartButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_widgets_tcategory_box_tcategory_box_component__["a" /* TCategoryBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_widgets_tsearch_tsearch_component__["a" /* TSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_widgets_tproduct_photo_frame_tproduct_photo_frame_component__["a" /* TProductPhotoFrameComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_widgets_tview_details_button_tview_details_button_component__["a" /* TViewDetailsButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_widgets_tadd_to_cart_button_tadd_to_cart_button_component__["a" /* TAddToCartButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_widgets_tproduct_details_panel_tproduct_details_panel_component__["a" /* TProductDetailsPanelComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_pages_tfour_oh_four_tfour_oh_four_component__["a" /* TFourOhFourComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_lib_router_app_router_module__["a" /* AppRouterModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/lib/router/app-router.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRouterModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tlanding_tlanding_component__ = __webpack_require__("../../../../../src/app/components/pages/tlanding/tlanding.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tdetails_tdetails_component__ = __webpack_require__("../../../../../src/app/components/pages/tdetails/tdetails.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tcart_tcart_component__ = __webpack_require__("../../../../../src/app/components/pages/tcart/tcart.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var kRoutes = [
    { path: 'landing', component: __WEBPACK_IMPORTED_MODULE_2__pages_tlanding_tlanding_component__["a" /* TLandingComponent */] },
    { path: 'details/:id', component: __WEBPACK_IMPORTED_MODULE_3__pages_tdetails_tdetails_component__["a" /* TDetailsComponent */] },
    { path: 'shopping-cart', component: __WEBPACK_IMPORTED_MODULE_4__pages_tcart_tcart_component__["a" /* TCartComponent */] },
    { path: '**', redirectTo: '/landing', pathMatch: 'full' }
];
var AppRouterModule = /** @class */ (function () {
    function AppRouterModule() {
    }
    AppRouterModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(kRoutes)
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]
            ],
            declarations: []
        })
    ], AppRouterModule);
    return AppRouterModule;
}());



/***/ }),

/***/ "../../../../../src/app/components/pages/tcart/tcart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/tcart/tcart.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tcart works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/tcart/tcart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TCartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TCartComponent = /** @class */ (function () {
    function TCartComponent() {
    }
    TCartComponent.prototype.ngOnInit = function () {
    };
    TCartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tcart',
            template: __webpack_require__("../../../../../src/app/components/pages/tcart/tcart.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/pages/tcart/tcart.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TCartComponent);
    return TCartComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/pages/tdetails/tdetails.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/tdetails/tdetails.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tdetails works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/tdetails/tdetails.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TDetailsComponent = /** @class */ (function () {
    function TDetailsComponent() {
    }
    TDetailsComponent.prototype.ngOnInit = function () {
    };
    TDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tdetails',
            template: __webpack_require__("../../../../../src/app/components/pages/tdetails/tdetails.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/pages/tdetails/tdetails.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TDetailsComponent);
    return TDetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tfour-oh-four works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TFourOhFourComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TFourOhFourComponent = /** @class */ (function () {
    function TFourOhFourComponent() {
    }
    TFourOhFourComponent.prototype.ngOnInit = function () {
    };
    TFourOhFourComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tfour-oh-four',
            template: __webpack_require__("../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/pages/tfour-oh-four/tfour-oh-four.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TFourOhFourComponent);
    return TFourOhFourComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/pages/tlanding/tlanding.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#table-00\n{\n    width:              100%;\n}\n\n#table-00-tr-00-td-00\n{\n    width:              50%;\n    text-align:         left;\n    padding:            0;\n}\n\n#table-00-tr-00-td-01\n{\n    width:              50%;\n    text-align:         right;\n    padding:            0;\n}\n\n#table-01\n{\n    width:              100%;\n}\n\n#table-01-tr-00-td-00\n{\n    width:              50%;\n    text-align:         left;\n}\n\n#table-01-tr-00-td-01\n{\n  width:                50%;\n  text-align:           right;\n}\n\n#flowpanel\n{\n    margin-top:         20px;\n    border-style:       inset;\n    border-width:       2px;\n    height:             600px;\n    vertical-align:     top;\n    overflow-y:         scroll;\n}\n\n#flowpanel > div\n{\n    float:              left;\n    padding:            10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/pages/tlanding/tlanding.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- TODO: Migrate to div + css table layout. For now, table worx. -->\n<table id=\"table-00\">\n    <tr>\n        <td id=\"table-00-tr-00-td-00\">\n            <app-tlogo></app-tlogo>\n        </td>\n        <td id=\"table-00-tr-00-td-01\">\n            <app-tgo-cart-button></app-tgo-cart-button>\n        </td>\n    </tr>\n</table>\n<hr/>\n<table id=\"table-01\">\n    <tr>\n        <td id=\"table-01-tr-00-td-00\">\n            <app-tcategory-box></app-tcategory-box>\n        </td>\n        <td id=\"table-01-tr-00-td-01\">\n            <app-tsearch></app-tsearch>\n        </td>\n    </tr>\n</table>\n<hr/>\n<div id=\"flowpanel\">\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n    <div>item</div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/pages/tlanding/tlanding.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TLandingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TLandingComponent = /** @class */ (function () {
    function TLandingComponent() {
    }
    TLandingComponent.prototype.ngOnInit = function () {
    };
    TLandingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tlanding',
            template: __webpack_require__("../../../../../src/app/components/pages/tlanding/tlanding.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/pages/tlanding/tlanding.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TLandingComponent);
    return TLandingComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tadd-to-cart-button works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TAddToCartButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TAddToCartButtonComponent = /** @class */ (function () {
    function TAddToCartButtonComponent() {
    }
    TAddToCartButtonComponent.prototype.ngOnInit = function () {
    };
    TAddToCartButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tadd-to-cart-button',
            template: __webpack_require__("../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tadd-to-cart-button/tadd-to-cart-button.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TAddToCartButtonComponent);
    return TAddToCartButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.html":
/***/ (function(module, exports) {

module.exports = "<select>\n    <option>Mock category 1</option>\n    <option>Mock category 2</option>\n    <option>Mock category 3</option>\n    <option>Mock category 4</option>\n    <option>Mock category 5</option>\n</select>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TCategoryBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TCategoryBoxComponent = /** @class */ (function () {
    function TCategoryBoxComponent() {
    }
    TCategoryBoxComponent.prototype.ngOnInit = function () {
    };
    TCategoryBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tcategory-box',
            template: __webpack_require__("../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tcategory-box/tcategory-box.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TCategoryBoxComponent);
    return TCategoryBoxComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.html":
/***/ (function(module, exports) {

module.exports = "<button>GoCart mock button</button>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TGoCartButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TGoCartButtonComponent = /** @class */ (function () {
    function TGoCartButtonComponent() {
    }
    TGoCartButtonComponent.prototype.ngOnInit = function () {
    };
    TGoCartButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tgo-cart-button',
            template: __webpack_require__("../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tgo-cart-button/tgo-cart-button.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TGoCartButtonComponent);
    return TGoCartButtonComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tlogo/tlogo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tlogo/tlogo.component.html":
/***/ (function(module, exports) {

module.exports = "<img src=\"/assets/branding/logo.png\">\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tlogo/tlogo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TLogoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TLogoComponent = /** @class */ (function () {
    function TLogoComponent() {
    }
    TLogoComponent.prototype.ngOnInit = function () {
    };
    TLogoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tlogo',
            template: __webpack_require__("../../../../../src/app/components/widgets/tlogo/tlogo.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tlogo/tlogo.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TLogoComponent);
    return TLogoComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tproduct-details-panel works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TProductDetailsPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TProductDetailsPanelComponent = /** @class */ (function () {
    function TProductDetailsPanelComponent() {
    }
    TProductDetailsPanelComponent.prototype.ngOnInit = function () {
    };
    TProductDetailsPanelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tproduct-details-panel',
            template: __webpack_require__("../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tproduct-details-panel/tproduct-details-panel.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TProductDetailsPanelComponent);
    return TProductDetailsPanelComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tproduct-photo-frame works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TProductPhotoFrameComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TProductPhotoFrameComponent = /** @class */ (function () {
    function TProductPhotoFrameComponent() {
    }
    TProductPhotoFrameComponent.prototype.ngOnInit = function () {
    };
    TProductPhotoFrameComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tproduct-photo-frame',
            template: __webpack_require__("../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tproduct-photo-frame/tproduct-photo-frame.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TProductPhotoFrameComponent);
    return TProductPhotoFrameComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tsearch/tsearch.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tsearch/tsearch.component.html":
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" placeholder=\"Search for...\"/>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tsearch/tsearch.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TSearchComponent = /** @class */ (function () {
    function TSearchComponent() {
    }
    TSearchComponent.prototype.ngOnInit = function () {
    };
    TSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tsearch',
            template: __webpack_require__("../../../../../src/app/components/widgets/tsearch/tsearch.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tsearch/tsearch.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TSearchComponent);
    return TSearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  tview-details-button works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TViewDetailsButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TViewDetailsButtonComponent = /** @class */ (function () {
    function TViewDetailsButtonComponent() {
    }
    TViewDetailsButtonComponent.prototype.ngOnInit = function () {
    };
    TViewDetailsButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-tview-details-button',
            template: __webpack_require__("../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/widgets/tview-details-button/tview-details-button.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TViewDetailsButtonComponent);
    return TViewDetailsButtonComponent;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
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