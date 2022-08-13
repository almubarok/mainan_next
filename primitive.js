// primitive variable, bolean, string, number
// non-primitive variable, object, array

// primitive, imutable
let umur = 1;
let umur2 = umur; // 1
umur = 2;

// console.log(umur); // 2
// console.log(umur2); // 1

// non primitive, mutable
let a = {
  nama: 'aku',
  usia: 0,
};
// let b = a; // yg disimpan bukan value tp alamat memori nya
let b = { ...a, usia: 10 };
a.nama = 'aku edit';

console.log(a);
console.log(b);

const ori = [1, 2, 3];

// const edit = ori;
const edit = [...ori];

console.log(ori);
