import * as readline from "readline";
import * as fs from "fs";
import { LocationList } from "./library/location-list";

const input: string[] = [];

readline
  .createInterface({
    input: fs.createReadStream(`inputs/day1`),
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
      default:
        console.log("You need to tell me which day to run");
    }
  });
