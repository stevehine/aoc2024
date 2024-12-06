import * as readline from "readline";
import * as fs from "fs";
import { LocationList } from "./library/location-list";
import { ReactorReports } from "./library/reactor-reports";
import { MemoryMultiplier } from "./library/memory-multiplier";
import { WordSearch } from "./library/word-search";
import { PrintQueue } from "./library/print-queue";
import { GuardedLab } from "./library/guarded-lab";

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
          console.log(
            `The number of safe reports is ${reactorReports.SafeReports}`,
          );
          console.log(
            `The number of safe dampened reports is ${reactorReports.SafeDampenedReports}`,
          );
        }
        break;
      case "day3":
        {
          const memoryMultiplier = new MemoryMultiplier(input);
          console.log(
            `Total from all the muls ${memoryMultiplier.TotalResult}`,
          );
          console.log(
            `Total from all the conditional muls ${memoryMultiplier.TotalResultWithConditionals}`,
          );
        }
        break;
      case "day4":
        {
          const wordSearch = new WordSearch(input);
          console.log(
            `There are ${wordSearch.XMASOccurances} occurances of XMAS`,
          );
          console.log(
            `There are ${wordSearch.CrossMASOccurances} occurances of CrossMAS`,
          );
        }
        break;
      case "day5":
        {
          const printQueue = new PrintQueue(input);
          console.log(
            `The sum of the middle pages is ${printQueue.SumOfMiddlePages}`,
          );
          console.log(
            `The sum of the corrected middle pages is ${printQueue.SumOfCorrectedMiddlePages}`,
          );
        }
        break;
      case "day6": {
        const guardedLab = new GuardedLab(input);
        console.log(
          `The guard will leave the lab after visiting ${guardedLab.VisitedLocations} locations`,
        );
        console.log(
          `There are ${guardedLab.PotentialParadoxes} potential locations to cause a paradox`,
        );
        break;
      }
      default:
        console.log("You need to tell me which day to run");
    }
  });
