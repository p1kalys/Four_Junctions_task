const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Property {
  constructor(name, buildTime, earning) {
    this.name = name;
    this.buildTime = buildTime;
    this.earning = earning;
  }

  getEarningPerUnitTime() {
    return this.earning / this.buildTime;
  }
}

class Solution {
  constructor(properties, totalUnit) {
    this.properties = properties;
    this.totalUnit = totalUnit;
    this.combinations = [];
  }

  findCount() {
    this.properties.forEach((property) => {
      property.maxCount = Math.floor(this.totalUnit / property.buildTime);
    });
    const arr = this.properties.map((property) =>
      Math.floor(this.totalUnit / property.buildTime)
    );
    return arr;
  }

  generateCombinations(presentArray, actualArray) {
    if (presentArray.every((val) => val === 0)) return;

    if (this.validCombination(presentArray)) {
      const totalEarning = this.calculateEarnings(presentArray);
      this.combinations.push(totalEarning);
    }

    let newArray = presentArray.slice();
    const n = presentArray.length;

    for (let i = n - 1; i >= 0; i--) {
      if (presentArray[i] > 0) {
        newArray[i]--;
        this.generateCombinations(newArray, actualArray);
        break;
      } else {
        newArray[i] = actualArray[i];
        if (i > 0) continue;

        if (newArray[i - 1] > 0) {
          newArray[i - 1]--;
          for (let j = i; j < n; j++) {
            newArray[j] = actualArray[j];
          }
          this.generateCombinations(newArray, actualArray);
        }
      }
    }
  }

  validCombination(temp) {
    let sum = 0;
    for (let j = 0; j < temp.length; j++) {
      sum += temp[j] * this.properties[j].buildTime;
    }
    return sum < this.totalUnit;
  }

  calculateEarnings(combination) {
    let totalEarning = 0;
    let remainingTime = this.totalUnit;

    for (let j = 0; j < combination.length; j++) {
      for (let k = 1; k <= combination[j]; k++) {
        remainingTime -= this.properties[j].buildTime;
        totalEarning += this.properties[j].earning * remainingTime;
      }
    }
    return { earning: totalEarning, combination };
  }

  printMaxEarnings() {
    let maxEarning = 0;
    let solutions = [];

    // Find the maximum earning
    this.combinations.forEach((earning) => {
      if (earning.earning > maxEarning) {
        maxEarning = earning.earning;
      }
    });

    // Solutions with the maximum earning
    this.combinations.forEach((earning, index) => {
      if (earning.earning === maxEarning) {
        let str = `${solutions.length + 1}. `;
        for (let i = 0; i < earning.combination.length; i++) {
          str += `${this.properties[i].name}:${earning.combination[i]} `;
        }
        solutions.push(str);
      }
    });

    // Print results
    console.log(`Time Unit: ${this.totalUnit}`);
    console.log(`Earnings: $${maxEarning}\n Solutions:`);
    solutions.forEach((solution) => console.log(solution));
  }
}

// Usage
const properties = [
  new Property("T", 5, 1500),
  new Property("P", 4, 1000),
  new Property("C", 10, 3000),
];

rl.question("Enter total units: ", (totalUnits) => {
  const manager = new Solution(properties, parseInt(totalUnits));
  const arr = manager.findCount();
  manager.generateCombinations(arr, arr);
  manager.printMaxEarnings();
  rl.close();
});
