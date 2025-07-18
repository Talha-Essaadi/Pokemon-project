// const item = document.querySelector(".item");
const body = document.querySelector("body");
const container = document.querySelector(".pokedex-list");
const slide = document.querySelector(".pokedex-slide");


let slideItem;
let emptySlide;

let closeIcon;

let index = 0;




async function fetchData(API) {
    try {
        const response = await fetch(API);

        const data = await response.json();


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
        function returnComponent() {
            if (data.types.length < 2) {
                // alert(index + 1);
                return "";
            }
            else {
                return `<div class="item-ability-2 item-ability">${data.types[1].type.name}</div>`;
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
                            <div class="item-ability-1 item-ability">${data.types[0].type.name}</div>
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
            element.addEventListener("click", handlSlideClick);
        });




    }
}



addNewitems();



async function handlSlideClick(e) {
    slide.style.display = "block";




    let numberElement = e.currentTarget.querySelector(".item-number").textContent;
    const pokemonNumber = parseInt(numberElement.replace("N°", ""));
    // console.log(pokemonNumber);
    let API = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
    let data = await fetchData(API);
    
    function returnComponent(stats) {
        if (stats == data.types){
              if (data.types.length < 2) {
            // alert(index + 1);
            return "";
        }
        else {
            return `<div class="item-ability-2 item-ability">${data.types[1].type.name}</div>`;
        }
            
        }
        else {
              if (data.abilities.length < 2) {
            // alert(index + 1);
            return "";
        }
        else {
            return `<div class="item-ability-2 item-ability">${data.abilities[1].ability.name}</div>`;
        }

        }
      
    }

    let allStats = data.stats[0].base_stat + data.stats[1].base_stat + data.stats[2].base_stat + data.stats[3].base_stat + data.stats[4].base_stat + data.stats[5].base_stat ;
    let slide_1 = `
    
    <div class="pokedex-slide-content">
                    <div class="empty-pokemon-display">
                        <div
                            class="pokedex-slide-content-item-image empty-pokemon-display-image">
                            <img
                                src="https://js-pokedex-virid.vercel.app/src/no-pokemon-selected-image.png"
                                alt>
                        </div>
                        <h1 class="empty-pokemon-display-text">Select a Pokemon
                            to display here.</h1>
                    </div>
                    <div class="pokedex-slide-content-item">
                        <div class="pokedex-slide-content-icon">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div class="pokedex-slide-content-item-image">
                            <img
                                src="${data.sprites.versions["generation-v"]["black-white"].animated["front_default"]}"
                                alt>
                        </div>
                        <div class="pokedex-slide-content-item-description">
                            <h1
                                class="pokedex-slide-content-item-number">N°${pokemonNumber}</h1>
                            <h1
                                class="pokedex-slide-content-item-name">${data.name}</h1>
                            <div class="item-buttons">
                                <div
                                    class="item-ability-1 item-ability">${data.types[0].type.name}</div>
                                    ${returnComponent(data.types)}
                                
                                </div>
                            <div class="pokedex-slide-content-slide-bottom">
                                <div class="pokedex-slide-content-text">
                                    <h1
                                        class="pokedex-slide-content-entry">Pokedex
                                        Entry</h1>
                                    <p
                                        class="pokedex-slide-content-entry-text">A
                                        strange seed was planted on its back at
                                        birth. the plant sprouts and grows with
                                        this
                                        pokémon.</p>
                                </div>
                                <div class="height-weight">
                                    <div class="height-design">
                                        <h1
                                            class="height-design-title">Height</h1>
                                        <div
                                            class="height-design-value">${data.height}m</div>
                                    </div>
                                    <div class="height-design">
                                        <h1
                                            class="height-design-title">Weight</h1>
                                        <div
                                            class="height-design-value">${data.weight}kg</div>
                                    </div>
                                </div>
                                <div class="Abilities">
                                    <h1
                                        class="pokedex-slide-content-entry">Abilities</h1>

                                    <div class="height-weight">

                                        <div class="height-design">

                                            <div class="height-design-value">${data.abilities[0].ability.name}</div>
                                            
                                                
                                        </div>
                                        <div class="height-design">

                                            <div
                                                class="height-design-value">${data.abilities[1].ability.name}</div>

                                        </div>
                                    </div>
                                </div>
                                <div class="stats">
                                    <h1
                                        class="pokedex-slide-content-entry">Stats</h1>

                                    <div class="Stats-content">
                                        <div class="stat-1">
                                            <div
                                                style="color: white;padding:8.5px; background-color: #DF2140;"
                                                class="stat-1-design">HP</div>
                                            <h1 class="stat-1-number">${data.stats[0].base_stat}</h1>
                                        </div>
                                        <div class="stat-1">
                                            <div
                                                style="color: white; background-color: #FF994D;"
                                                class="stat-1-design">ATK</div>
                                            <h1 class="stat-1-number">${data.stats[1].base_stat}</h1>
                                        </div>
                                        <div class="stat-1">
                                            <div
                                                style="color: white; background-color: #EECD3D;"
                                                class="stat-1-design">DEF</div>
                                            <h1 class="stat-1-number">${data.stats[2].base_stat}</h1>
                                        </div>
                                        <div class="stat-1">
                                            <div
                                                style="color: white; background-color: #85DDFF;"
                                                class="stat-1-design">SpA</div>
                                            <h1 class="stat-1-number">${data.stats[3].base_stat}</h1>
                                        </div>
                                        <div class="stat-1">
                                            <div
                                                style="color: white; background-color: #96DA83;"
                                                class="stat-1-design">SpD</div>
                                            <h1 class="stat-1-number">${data.stats[4].base_stat}</h1>
                                        </div>
                                        <div class="stat-1">
                                            <div
                                                style="color: white; background-color: #FB94A8;"
                                                class="stat-1-design">SPD</div>
                                            <h1 class="stat-1-number">${data.stats[5].base_stat}</h1>
                                        </div>
                                        <div style="background-color: #88AAEA;"
                                            class="stat-1">
                                            <div
                                                style="color: white; background-color: #7195DC;"
                                                class="stat-1-design">TOT</div>
                                            <h1 class="stat-1-number">${allStats}</h1>
                                        </div>
                                    </div>

                                </div>

                                <div style="height:300px;" class="Evolution">
                                    <h1
                                        class="pokedex-slide-content-entry">Evolution</h1>
                                    <div class="Evolution-content">
                                        <div class="image-1">
                                            <img
                                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png"
                                                alt>
                                        </div>
                                        <h1 class="Evolution-number">Lv.16</h1>
                                        <div class="image-1"><img
                                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber + 1}.png"
                                                alt></div>
                                        <h1 class="Evolution-number">Lv.32</h1>
                                        <div class="image-1"><img
                                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber + 2}.png"
                                                alt></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `;


    slide.innerHTML = slide_1;
    slideItem = document.querySelector(".pokedex-slide-content-item");
    emptySlide = document.querySelector(".empty-pokemon-display");
    slideItem.style.display = "block";
    emptySlide.style.display = "none";
    closeIcon = document.querySelector(".pokedex-slide-content-icon i");
    closeIcon.addEventListener("click", () => {
        slide.style.display = "none";



        // overflow: hidden;

    })

}
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 500) {
        // container.style.backgroundColor = "red";
        addNewitems();

    }
});
