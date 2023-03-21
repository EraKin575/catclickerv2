const var1 = {
    name: "John",
    age: 25,
    address: {
        state: "Rajasthan",
        city: "Udaipur",
      },
    
  };
  var2.address.state = "Bihar";
 
  
  const var3=var1.age
  
  const var2={
  ...var1,age:var3
  }
  
  console.log(var2)
// console.log("A");
// setTimeout(function display() {
//   console.log("B");
// }, 0);
// consol


// const str = "lorem ipsum dolor"

// for(let i=0;i<str.length;i++){
//     if(i===0 || str.charAt(i-1)===' '){
//         str.charAt(i).toUpperCase()
//     }

// }

// console.log(str)



const str="abcd"

console.log(str.substring(1,3))
