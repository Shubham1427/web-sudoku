export function copy2dArray(currentArray)
{
    var newArray = [];

    for (var i = 0; i < currentArray.length; i++)
        newArray[i] = currentArray[i].slice();

    return newArray;
}