function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  static populateCars(cars: CarData[]): CarData[] {
    return cars.map((car) => {
      const isPositive: boolean = getRandomInt(0, 1) === 1;
      const timeAt: Date = new Date();
      const mutator: number = getRandomInt(1000000, 100000000);
      const availableAt: Date = new Date(
        timeAt.getTime() + (isPositive ? mutator : -1 * mutator),
      );

      return {
        ...car,
        availableAt,
      };
    });
  }

  static async listCars(filterer?: (car: CarData) => boolean): Promise<CarData[]> {
    let cars: CarData[];
    let cachedCarsString: string | null = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cacheCars: CarData[] = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json",
      );
      const body: CarData[] = await response.json();
      cars = this.populateCars(body);

      localStorage.setItem("CARS", JSON.stringify(cars));
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}
