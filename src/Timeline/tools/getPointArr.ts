function getPointArr(total: number, point_num: number) {
  const unit = parseInt((total / point_num) as any);
  const point_arr = [];
  for(let i = 0; i < point_num; i++) {
    point_arr.push((unit / 2) + unit * i);
  }
  return [point_arr, unit];
}

export default getPointArr;