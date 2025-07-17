let API = "https://pokeapi.co/api/v2/pokemon/";
let pokimons;
async function fetchData() {
    try {
        const response = await fetch(API);
        
        const data = await response.json();
        
        
        return data;
    }
    catch (error) {
        console.error("Error :", error);
    }


}

async function fethAllPokimons() {
let data = await fetchData();
console.log(data);  
let pokimonsCount = data.count ;
API = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${pokimonsCount}`
data = await fetchData();
}

fethAllPokimons();
