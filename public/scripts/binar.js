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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Binar {
    static populateCars(cars) {
        return cars.map((car) => {
            const isPositive = getRandomInt(0, 1) === 1;
            const timeAt = new Date();
            const mutator = getRandomInt(1000000, 100000000);
            const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator));
            return Object.assign(Object.assign({}, car), { availableAt });
        });
    }
    static listCars(filterer) {
        return __awaiter(this, void 0, void 0, function* () {
            let cars;
            let cachedCarsString = localStorage.getItem("CARS");
            if (!!cachedCarsString) {
                const cacheCars = JSON.parse(cachedCarsString);
                cars = this.populateCars(cacheCars);
            }
            else {
                const response = yield fetch("https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json");
                const body = yield response.json();
                cars = this.populateCars(body);
                localStorage.setItem("CARS", JSON.stringify(cars));
            }
            if (filterer instanceof Function)
                return cars.filter(filterer);
            return cars;
        });
    }
}
