import * as readline from "readline";
import * as fs from "fs";
import { LocationList } from "./library/location-list";
import { ReactorReports } from "./library/reactor-reports";
import { MemoryMultiplier } from "./library/memory-multiplier";

const input: string[] = [];

readline
  .createInterface({
    input: fs.createReadStream(`inputs/${process.argv[2]}`),
    terminal: false,
  })
  .on("line", function (line) {
    input.push(line);
  })
  .on("close", function () {
    switch (process.argv[2]) {
      case "day1":
        {
          const locationList = new LocationList(input);
          console.log(
            `The distance between the lines is ${locationList.ListDistance}`,
          );
          console.log(
            `The similarity of the lists is ${locationList.SimilarityScore}`,
          );
        }
        break;
      case "day2":
        {
          const reactorReports = new ReactorReports(input);
          console.log(`The number of safe reports is ${reactorReports.SafeReports}`)
          console.log(`The number of safe dampened reports is ${reactorReports.SafeDampenedReports}`)
        }
        break;
      case "day3":
        {
          const memoryMultiplier = new MemoryMultiplier(input);
          console.log(`Total from all the muls ${memoryMultiplier.TotalResult}`);
          console.log(`Total from all the conditional muls ${memoryMultiplier.TotalResultWithConditionals}`);
        }
      default:
        console.log("You need to tell me which day to run");
    }
  });
