
var level = require("level-test")()
  , levelgraph = require("../")

  , db = levelgraph(level())

  , startCounts = 16777216
  , counts = startCounts

  , startTime = new Date()
  , endTime

  , doBench = function() {
      if(counts % 10000 === 0) {
        console.log(counts);
      }
      if(--counts === 0) {
        endTime = new Date();
        var totalTime = endTime - startTime;
        console.log("total time", totalTime);
        console.log("writes/s", startCounts / totalTime * 1000);
        console.log('Memory usage', Math.round(process.memoryUsage().rss / 1024 / 1024), 'MB');
        return;
      }

      var triple = { 
        subject: "s" + counts,
        predicate: "p" + counts,
        object: "o" + counts
      };

      db.put(triple, doBench);
    };

doBench();
