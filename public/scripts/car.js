"use strict";
class Car {
    static init(cars) {
        this.list = cars.map((car) => new Car(car));
    }
    constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt, }) {
        this.id = id;
        this.plate = plate;
        this.manufacture = manufacture;
        this.model = model;
        this.image = image;
        this.rentPerDay = rentPerDay;
        this.capacity = capacity;
        this.description = description;
        this.transmission = transmission;
        this.available = available;
        this.type = type;
        this.year = year;
        this.options = options;
        this.specs = specs;
        this.availableAt = new Date(availableAt);
    }
    render() {
        return `
    <div class="col-12 col-xl-4">
        <div class="card h-100">
            <img src="${this.image}" class="card-img-top car-image" alt="...">
            <div class="card-body mt-4 d-flex flex-column" style="padding: 0">
                <h6 >${this.manufacture} ${this.model}</h6>
                <h5 class="card-title">Rp. ${this.rentPerDay.toLocaleString()} / hari</h5>
                <p class="card-text grow">${this.description}</p>
                <span class="fw-light text-secondary mb-2"><i class="bi bi-people me-1"></i> ${this.capacity} orang</span>
                <span class="fw-light text-secondary mb-2"><i class="bi bi-gear me-1"></i> ${this.transmission}</span>
                <span class="fw-light text-secondary mb-4"><i class="bi bi-calendar me-1"></i> Tahun ${this.year}</span>
                <a href="#" class="mt-auto btn btn-primary w-100" ${this.available ? "" : "disabled"}>Pilih Mobil</a>
            </div>
        </div>
    </div>
    `;
    }
}
Car.list = [];
