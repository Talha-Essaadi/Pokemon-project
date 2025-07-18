// const item = document.querySelector(".item");
const body = document.querySelector("body");
const slideItem = document.querySelector(".pokedex-slide-content-item");
const emptySlide = document.querySelector(".empty-pokemon-display");
const container = document.querySelector(".pokedex-list");
const slide = document.querySelector(".pokedex-slide");
const closeIcon = document.querySelector(".pokedex-slide-content-icon i");
let index = 0;
closeIcon.addEventListener("click", () => {
    slide.style.display = "none";

    
   
    // overflow: hidden;

})
async function fetchData(API) {
    try {
        const response = await fetch(API);
        // console.log(response);
        const data = await response.json();

        console.log(data.name);
        // container.textContent = JSON.stringify(data, null, 2);

        return data;
    }
    catch (error) {
        console.error("Error :", error);
    }


}



async function addNewitems() {


    for (let i = 0; i < 20; i++) {
        
      
        let API = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
        
        let data = await fetchData(API);
        // console.log(data.sprites.versions["generation-v"]["black-white"].animated["front_default"]);
        function returnComponent (){
            if (data.abilities.length < 2){
                // alert(index + 1);
                return "";
            }
            else {
                return `<div class="item-ability-2 item-ability">${data.abilities[1].ability.name}</div>`;
            }
        }
        // alert(data.sprites.other.dream_world.front_default);
        let item = `
                <div class="item">
                    <div class="item-image">
                        <img src="${data.sprites.front_default}" alt="">
                    </div>
                    <div class="item-description">
                        <h1 class="item-number">N°${index + 1}</h1>
                        <h1 class="item-name">${data.name}</h1>
                        <div class="item-buttons">
                            <div class="item-ability-1 item-ability">${data.abilities[0].ability.name}</div>
                            ${returnComponent()}
                        </div>
                    </div>
                </div>
`
            ;
        index++;
        container.innerHTML += item;
        let itemDom = document.querySelectorAll(".item");
        itemDom.forEach(element => {
            element.addEventListener("click", () => {
                slide.style.display = "block";
                slideItem.style.display = "block";
                emptySlide.style.display= "none";
            
            
                

            });
        });




    }
}
addNewitems();


window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 500) {
        // container.style.backgroundColor = "red";
        addNewitems();

    }
});
