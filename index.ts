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
import { PlutoniumPebbles } from "./library/plutonium-pebbles";
import { GardenGroups } from "./library/garden-groups";
import { Arcade } from "./library/arcade";
import { RestroomRobots } from "./library/restroom-robots";
import { Warehouse } from "./library/warehouse";
import { ReindeerMaze } from "./library/reindeer-maze";
import { ChronospatialComputer } from "./library/chronospatial-computer";
import { RamRun } from "./library/ram-run";

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
        console.log(`The checksum of the disk is ${diskDefragmenter.CheckSum}`);
        console.log(
          `The checksum of the disk is ${diskDefragmenter.CheckSumWholeFiles} when considering whole files`,
        );
        break;
      }
      case "day10":
        {
          const topographicMap = new TopographicMap(input);
          console.log(
            `The score of the trailheads is ${topographicMap.SumOfTrailheads}`,
          );
          console.log(
            `The number of unique trails is ${topographicMap.SumOfUniqueTrailsByTrailheads}`,
          );
        }
        break;
      case "day11":
        {
          const plutoniumPebbles = new PlutoniumPebbles(input[0]);
          plutoniumPebbles.blink(25);
          console.log(
            `After 25 blinks there are ${plutoniumPebbles.StoneCount} pebbles`,
          );
          plutoniumPebbles.blink(50);
          console.log(
            `After 75 blinks there are ${plutoniumPebbles.StoneCount} pebbles`,
          );
        }
        break;
      case "day12":
        {
          const gardenGroups = new GardenGroups(input);
          console.log(`The fence will cost ${gardenGroups.PriceOfFence}`);
          console.log(
            `The discount fence will cost ${gardenGroups.PriceOfDiscountFence}`,
          );
        }
        break;
      case "day13":
        {
          const arcade = new Arcade(input);
          console.log(`The lowest cost of the arcade is ${arcade.TokenCount}`);
          console.log(
            `The lowest cost of the longrange arcade is ${arcade.TokenCountLongRange}`,
          );
        }
        break;
      case "day14":
        {
          let restroomRobots = new RestroomRobots(input, 101, 103);
          restroomRobots.MoveRobots(100);
          console.log(
            `The safety factor after 100 seconds is ${restroomRobots.SafetyFactor}`,
          );
          restroomRobots = new RestroomRobots(input, 101, 103);
          restroomRobots.SearchForTree(50000);
        }
        break;
      case "day15":
        {
          const warehouse = new Warehouse(input);
          console.log(`The GPS Score is ${warehouse.GPSTotal}`);
          console.log(`The Big GPS Score is ${warehouse.BigGPSTotal}`);
        }
        break;
      case "day16":
        {
          const reindeerMaze = new ReindeerMaze(input);
          console.log(`The best score is ${reindeerMaze.BestScore}`);
          console.log(
            `The unique square count is ${reindeerMaze.UniqueSquares}`,
          );
        }
        break;
      case "day17":
        {
          const chronospatialComputer = new ChronospatialComputer(input);
          const initialMemory = chronospatialComputer.Memory.split(",");
          chronospatialComputer.runToCompletion();
          console.log(
            `The output buffer is ${chronospatialComputer.OutputBuffer}`,
          );

          const testValue = "1000000000000000"
            .split("")
            .map((val) => parseInt(val));
          const len = testValue.length;
          let i;
          let bestIndex = 1;
          do {
            i = parseInt(testValue.join(""), 8);
            const chronospatialComputer = new ChronospatialComputer(input);
            chronospatialComputer.hackA(i);
            chronospatialComputer.runToCompletion();
            const finalOutput = chronospatialComputer.OutputBuffer.split(",");
            console.log(initialMemory.join(","));
            console.log(finalOutput.join(","));
            if (initialMemory[len - bestIndex] === finalOutput[len - bestIndex])
              bestIndex++;
            else {
              testValue[bestIndex - 1]++;
              while (testValue[bestIndex - 1] === 8) {
                testValue[bestIndex - 1] = 0;
                bestIndex--;
                testValue[bestIndex - 1]++;
              }
            }
          } while (bestIndex <= testValue.length);
          console.log(`The magic value is ${i}`);
        }
        break;
      case "day18": {
        const ramRun = new RamRun(input, 71, true);
        ramRun.dropBytes(1024);
        ramRun.calculateShortestPath();
        console.log(`The shortest path is ${ramRun.ShortestPath} blocks long`);
      } break;
      default:
        console.log("You need to tell me which day to run");
    }
  });
