import dotenv from "dotenv"
import fs, { writeFileSync } from 'fs'
import axios from 'axios';
dotenv.config() //initalize dotenv

const getDates = new Date();

function nextDate(day) {
    let n = 0;


    if (day == 'tomorrows') {
        n++;
    }
    else if (day == 'yesterday') {
        n--;
    }
    else if (day == 'todays') {
        n = 0;
    }
    else {
        //day has weekarray element
        const weekArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let dayNo = weekArray.indexOf(day);
        n = getDates.getDay() - dayNo;
        //if n gets -ve number then
        if (n < 0) { n = n * (-1); }

    }
    //setting current date to next date by simply incrementing
    getDates.setDate(getDates.getDate() + n)

    //returning getDates
    let d = getDates.toLocaleDateString()

    //replaceing all backslash
    d = d.replaceAll('/', '-')
    return d
}


export async function apiInfo(places = 'mumbai', day) {
    const date = nextDate(day);
    // console.log(date)
    let hours = getDates.getHours();
    let tdeg;
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${places}&dt=${date}`;
    let response = await axios.get(url);
    let tempVariable = response.data['forecast']
    fs.writeFileSync('src/data.json', JSON.stringify(response.data))

    tempVariable = tempVariable['forecastday']
    tempVariable = tempVariable[0].hour[hours];

    //use this to get condition pf wheather
    let wheatherCondition = tempVariable['condition'].text;

    console.log(wheatherCondition)
    tdeg = tempVariable['temp_c'];
    console.log(tdeg)
    return [tdeg, wheatherCondition, date];


}
// data('2024-03-21')
// apiInfo('Thana', '')
export async function memeapi() {
    let r = await axios.get('https://meme-api.com/gimme');
    let memes = r.data
    return memes.url

}
// console.log(nextDate('wednesday'))