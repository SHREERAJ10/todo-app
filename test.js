// let arr = ['naruto','levi','gojo'];
// console.log(typeof(arr));
// let arr2 = JSON.stringify(arr);
// console.log(typeof(arr2));
// let arr3 = JSON.parse(arr2);
// console.log(typeof(arr3));

let arrs = [{"task":"bla bla",completed:true},{task:"bla ba",completed:false}];

for(let arr of arrs){
    console.log(arr.task);
}