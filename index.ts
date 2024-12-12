import * as readline from "readline";
import * as fs from "fs";
import { LocationList } from "./library/location-list";
import { ReactorReports } from "./library/reactor-reports";
import { MemoryMultiplier } from "./library/memory-multiplier";
import { WordSearch } from "./library/word-search";
import { PrintQueue } from "./library/print-queue";
import { GuardedLab } from "./library/guarded-lab";
import { CalibrationOperators } from "./library/calibration-operators";
import { ResonantColinearity } from "./library/resonant-colinearity";
import { DiskDefragmenter } from "./library/disk-defragmenter";
import { TopographicMap } from "./library/topographic-map";
import { GardenGroups } from "./library/garden-groups";

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
      case "day7": {
        const calibrationOperators = new CalibrationOperators(input);
        console.log(
          `The sum of the possible totals is ${calibrationOperators.TotalOfValidCalculations}`,
        );
        console.log(
          `The sum of the possible totals with concat is ${calibrationOperators.TotalOfValidCalculationsIncludingConcat}`,
        );
        break;
      }
      case "day8":
        {
          const resonantColinearity = new ResonantColinearity(input);
          console.log(
            `There are ${resonantColinearity.UniqueAntiNodeLocations} unique nodes`,
          );
          console.log(
            `There are ${resonantColinearity.AlignedAntiNodeLocations} aligned unique nodes`,
          );
        }
        break;
      case "day9": {
        const diskDefragmenter = new DiskDefragmenter(input[0]);
        console.log(
          `The checksum of the disk is ${diskDefragmenter.CheckSum}`
        )
        console.log(
          `The checksum of the disk is ${diskDefragmenter.CheckSumWholeFiles} when considering whole files`
        )
        break;
      }
      case "day10": {
        const topographicMap = new TopographicMap(input);
        console.log(`The score of the trailheads is ${topographicMap.SumOfTrailheads}`);
        console.log(`The number of unique trails is ${topographicMap.SumOfUniqueTrailsByTrailheads}`);
      }
        break;
      case "day12": {
        const gardenGroups = new GardenGroups(input);
        console.log(`The fence will cost ${gardenGroups.PriceOfFence}`);
        console.log(`The discount fence will cost ${gardenGroups.PriceOfDiscountFence}`);
      }
        break;
      default:
        console.log("You need to tell me which day to run");
    }
  });
