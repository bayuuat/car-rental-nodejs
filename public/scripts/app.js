"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
class App {
    constructor() {
        this.run = () => {
            const carRendered = Car.list.map((car) => car.render()).join("");
            const empty = `
    <div class="col-12">
      <div class="text-center text-white p-5 bg-secondary">
        Tidak Ada Mobil yang Sesuai
      </div>
    </div>
    `;
            if (this.carContainerElement) {
                this.carContainerElement.innerHTML =
                    Car.list.length > 0 ? carRendered : empty;
            }
        };
        this.filter = () => __awaiter(this, void 0, void 0, function* () {
            const someFilter = (item) => {
                return (item.capacity >= params.penumpang &&
                    item.transmission === params.transmisi &&
                    item.availableAt >= 80 &&
                    item.rentPerDay >= params["price-from"] &&
                    item.rentPerDay <= params["price-to"]);
            };
            const cars = yield Binar.listCars(someFilter);
            Car.init(cars);
            this.run();
        });
        this.clear = () => {
            var _a, _b;
            let child = (_a = this.carContainerElement) === null || _a === void 0 ? void 0 : _a.firstElementChild;
            while (child) {
                child.remove();
                child = (_b = this.carContainerElement) === null || _b === void 0 ? void 0 : _b.firstElementChild;
            }
        };
        this.carContainerElement = document.getElementById("cars-container");
        this.formSearch = document.getElementById("search-form");
        this.transmisi = document.getElementById("tipe-transmisi");
        this.tanggal = document.getElementById("available-time");
        this.priceFrom = document.getElementById("price-from");
        this.priceTo = document.getElementById("price-to");
        this.penumpang = document.getElementById("jumlah-penumpang");
        if (params) {
            if (this.transmisi && params.transmisi) {
                this.transmisi.value = params.transmisi;
            }
            if (this.tanggal && params.tanggal) {
                this.tanggal.value = params.tanggal;
            }
            if (this.priceFrom && params["price-from"]) {
                this.priceFrom.value = params["price-from"];
            }
            if (this.priceTo && params["price-to"]) {
                this.priceTo.value = params["price-to"];
            }
            if (this.penumpang && params.penumpang) {
                this.penumpang.value = params.penumpang;
            }
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.load();
            if (this.formSearch) {
                this.formSearch.onsubmit = (e) => {
                    this.filter();
                };
            }
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(params).length > 0) {
                this.filter();
            }
            else {
                const cars = yield Binar.listCars();
                Car.init(cars);
                this.run();
            }
        });
    }
}
