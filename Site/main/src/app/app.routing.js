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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    // path: 'hero/:id'
    //Lazy loading Checkout module
    {
        path: 'checkout',
        loadChildren: '.checkout.module#CheckoutModule'
    },
    {
        path: 'checkout-success',
        loadChildren: '.checkout.module#CheckoutModule'
    },
    {
        path: 'checkout-fail',
        loadChildren: '.checkout.module#CheckoutModule'
    },
    //Lazy loading Pages module
    {
        path: 'faq',
        loadChildren: '.pages.module#PagesModule'
    },
    {
        path: 'settings',
        loadChildren: '.pages.module#PagesModule'
    },
    {
        path: 'register-cook',
        loadChildren: '.pages.module#PagesModule'
    },
    {
        path: 'about',
        loadChildren: '.pages.module#PagesModule'
    },
    {
        path: 'contact',
        loadChildren: '.pages.module#PagesModule'
    },
    //Lazy loading Order module
    {
        path: 'order-page-details',
        loadChildren: '/app/order/order.module#OrderModule'
    },
    //Lazy loading Chat module
    {
        path: 'chat',
        loadChildren: '/app/chat/chat.module#ChatModule'
    },
    {
        path: 'mailbox',
        loadChildren: '/app/chat/chat.module#ChatModule'
    },
    //Lazy loading Cook module
    {
        path: 'cook-profile',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'cook-revenues',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'cook-dishes',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'dish-details',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'dish-gallery',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'dish-schedule',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'dish-pricing',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'dish-publish',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
    {
        path: 'last-minute',
        loadChildren: '/app/cook/cook.module#CookModule'
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//export const appRoutingProviders: any[] = [];
//export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map