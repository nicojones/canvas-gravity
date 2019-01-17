var numbers = [];
var max_number = 100;
var max_number_sqrt = Math.ceil(Math.sqrt(max_number));

for (var i = 0; i <= max_number; ++i) {
  numbers.push(i);
}

for (var i = 2; i < max_number_sqrt; ++i)
 {
  for (var j = i; j*i < max_number; ++j)
   {
    numbers[j * i] = 0;
  }
}


var primes = [];

for (var i = 0; i <= max_number; ++i) {
  if (numbers[i] != 0) {
    primes.push(i);
  }
}


/*

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

[0, 1, 2, 3, 0, 5, 0, 7, 0, 9]

[0, 1, 2, 3, 0, 5, 0, 7, 0, 0]












*/