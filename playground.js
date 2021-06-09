var LZUTF8 = require('lzutf8');
let n1 = BigInt(0), n2 = BigInt(1), nextTerm = BigInt(0);

console.log('Fibonacci Series:');

for (let i = 1; i <= 1000; i++) {
    // console.log(`------------`);

    // console.log(i,n1.toString(16));
    // console.log(`------------`);

    compressToBase64nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
}