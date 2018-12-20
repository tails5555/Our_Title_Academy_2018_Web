export const arrayToLocalString = (dateArray) => {
    const str = ['년', '월', '일', '시', '분', '초'];
    const curYear = new Date().getFullYear();
    let date = '';
    let startIdx = 0;
    if(curYear === dateArray[0]){
        startIdx = 1;
    }
    for(var k=startIdx;k<dateArray.length;k++){
        date += `${dateArray[k]}${str[k]}${k === dateArray.length - 1 ? '' : ' '}`;
    }
    return date;
}