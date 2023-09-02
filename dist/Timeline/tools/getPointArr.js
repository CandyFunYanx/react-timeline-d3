function getPointArr(total, point_num) {
    var unit = parseInt((total / point_num));
    var point_arr = [];
    for (var i = 0; i < point_num; i++) {
        point_arr.push((unit / 2) + unit * i);
    }
    return [point_arr, unit];
}
export default getPointArr;
