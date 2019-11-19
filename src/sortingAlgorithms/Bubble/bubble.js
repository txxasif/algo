const Bubble_Sort = (arr) => {
    var ar = arr;
    var xx;
    var animation = [[1,1]];
for(let i = 0;i<ar.length-1;i++) {
    for(let j = 0;j<ar.length-i-1;j++) {
        if(ar[j]>ar[j+1]) {
            const o = ar[j] , p = ar[j+1];
            animation.push([j,j+1]);
           // animation.push(j,j+1);
            animation.push([o,p])
            var x = ar[j];
            ar[j] = ar[j+1];
            ar[j+1] = x;
        }
    }
}
return animation;
}
export default Bubble_Sort;