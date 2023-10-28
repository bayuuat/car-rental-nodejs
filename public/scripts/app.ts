const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

class App {
  private carContainerElement: HTMLDivElement | null;
  private formSearch: HTMLFormElement | null;

  private transmisi: HTMLSelectElement | null;
  private tanggal: HTMLInputElement | null;
  private priceFrom: HTMLInputElement | null;
  private priceTo: HTMLInputElement | null;
  private penumpang: HTMLInputElement | null;

  constructor() {
    this.carContainerElement = document.getElementById(
      "cars-container",
    ) as HTMLDivElement | null;
    this.formSearch = document.getElementById(
      "search-form",
    ) as HTMLFormElement | null;

    this.transmisi = document.getElementById(
      "tipe-transmisi",
    ) as HTMLSelectElement | null;
    this.tanggal = document.getElementById(
      "available-time",
    ) as HTMLInputElement | null;
    this.priceFrom = document.getElementById(
      "price-from",
    ) as HTMLInputElement | null;
    this.priceTo = document.getElementById(
      "price-to",
    ) as HTMLInputElement | null;
    this.penumpang = document.getElementById(
      "jumlah-penumpang",
    ) as HTMLInputElement | null;

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

  async init() {
    await this.load();

    if (this.formSearch) {
      this.formSearch.onsubmit = (e) => {
        this.filter();
      };
    }
  }

  run = () => {
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

  async load() {
    if (Object.keys(params).length > 0 ) {
      this.filter();
    } else {
      const cars = await Binar.listCars();
      Car.init(cars);
      this.run();
    }
  }

  filter = async () => {
    const someFilter = (item: any) => {
      return (
        item.capacity >= params.penumpang &&
        item.transmission === params.transmisi &&
        item.availableAt >= 80 &&
        item.rentPerDay >= params["price-from"] &&
        item.rentPerDay <= params["price-to"]
      );
    };

    const cars = await Binar.listCars(someFilter);

    Car.init(cars);
    this.run();
  };

  clear = () => {
    let child = this.carContainerElement
      ?.firstElementChild as HTMLElement | null;

    while (child) {
      child.remove();
      child = this.carContainerElement?.firstElementChild as HTMLElement | null;
    }
  };
}
