//promise and async
async function start(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)

}

//for option script
start()

function createBreedList(breedList){
    document.getElementById("breed").innerHTML = ` 
    <select onchange ="loadByBreed(this.value)">
            <option >Choose a dog breed</option>
            ${Object.keys(breedList).map(function(breed){
               return `<option>${breed}</option>`
            }).join('')}
        </select>`
}
//for Choose dog breed
async function loadByBreed(breed){
    if(breed != "Choose a dog breed"){
        const response = await fetch(` https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message);
    }
}
//slide showdiv
function createSlideShow(images){
    let currentPosition = 0
    document.getElementById('slideshow').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    `
    currentPosition += 2
    setInterval(nextSlide, 3000)
    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`)
        setTimeout(function(){
            document.querySelector(".slide").remove
        }, 1000)
        if (currentPosition + 1 >= images.length){
            currentPosition = 0
        }else{
            currentPosition++
        }
    }

}