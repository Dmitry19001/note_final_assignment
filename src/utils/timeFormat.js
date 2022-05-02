export default function(input){
    var output = input > 9 ? input.toString() : '0' + input.toString();
    return output;
}