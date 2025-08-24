// let text  = "visit school"

// let n = text.search(/school/i)
// console.log(n)


// let match = " this should match should";
// let match1 = match.match(/should/)
// console.log(match1);

// let replace = "visit school";
// let replace1 = replace.replace(/school/,'home')
// console.log(replace1);

// let or = "whiteblack,blue,:yellow,green,red"
// let or1 = or.match(/:|blue|white/g)
// console.log(or1)

// let digit = " I WANT 300 hike"
// let digit1 = digit.match(/\d/g)
// console.log(digit1)

// let word = digit.match(/\w/g)
// console.log(word)

// let text = "vivek is good boy 100"
// let text1 = text.match(/0+/)
// console.log("text 1 ==", text1);

// global search for 10

// let text = "1 101000000 1000?"
// let text1 = text.match(/101/g)
// console.log(text1)

// regular expression assertion

// const text = "w3school hello from w3school"
// const pattern = /^w3school/
// const text2 = pattern.test(text)
// console.log(text2)

// const text = "hello from w3school";
// console.log(/w3school$/.test(text))

// match digit

// const pattern = /[a-z]/g

// let text = "more than  times"
// console.log(text.match(pattern))

// console.log( "visit w3school".match(/is/g))
// console.log("aaaabb".match(/(aa)(bb)/d));

// const obj = {
//     a:"hello",
//     b:function(dd){
//         console.log("hello world",dd)
//     }
// }

// obj.b(3);

// console.log(220||"hello")
// console.log("number"&&undefined)
// console.log(typeof typeof NaN)
// console.log(isNaN("hello"))
// console.log(isNaN(4));
// console.log(isNaN(1))
// console.log(isNaN(true))
// console.log(isNaN("false"))
// console.log(isNaN(0))

// (function(){ 
//   // Do something;
//   console.log("hello c");
  
// })();

// function tst(){

//     console.log(this)
// }
// process.on('uncaughtException',()=>{
//     console.log("an error occured")
// })

// tst()

// let obj1 = {
//     address:"Ahmedabad",
//     getAddress:function(){
//         console.log(this.address)
//     }
// }
// let getAddress = obj1.getAddress;
// let obj2 = {address:"vivek",getAddress};
// obj2.getAddress()

// let person = {
//     name:"vivek",

// }
// function sayHello(){
//     return "hello"+this.name
// }

// let  v= sayHello.call(person)

// console.log(v)

// function extractValue(...arg){
//     console.log(arg)
// }
// extractValue(1,2,3)

// function* iteratorFunc() {
//   let count = 0;
//   for (let i = 0; i < 3; i++) {
//       count++;
//       yield i;
//   }
//   return count;
// }

// let iterator = iteratorFunc();
// console.log(iterator.next());
// console.log("hello world is here")
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// let obj = { id: "1", name: "user22", age: "26", work: "programmer" };

// // console.log(Object.keys(obj))
// // console.log(Object.values(obj));
// // console.log(Object.entries(obj))

// function x(value){
//   let count = 0;
//   const vowels = ['a', 'e', 'i', 'o', 'u']
//     for(let char of value.toLowerCase()){
//         if(vowels.includes(char)) count++
//     }
//     return count;
// }

// console.log(x("vivek"))


// const w1 = "Deepak";
// let a = w1.toLowerCase().split("").sort().join("")
// console.log(a)

