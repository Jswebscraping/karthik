(async function main (){
let text = "Manufacturer Details 9th floor, Wework Building, Outer Ring Road, Near central mall, Bellandur, Bangalore-560103";
let pattern = /Manufacturer Details/i;
let result = text.match(pattern);
console.log(result);
})()