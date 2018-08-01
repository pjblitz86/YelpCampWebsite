function average(arr) {
  var sum = 0;
  arr.forEach(function(num) {
    sum += num;
  });
  var avgScore = Math.round(sum/arr.length);
  return avgScore;
}

var scores = [90,98,89,100,100,86,94];
console.log(average(scores));