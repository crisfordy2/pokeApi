// consimir API
const API = "https://pokeapi.co/api/v2/pokemon?limit=00&offset=20";

// Consumir API
const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            getUrl(json.results), paginacion(json.next, json.previous);
        })
        .catch((error) => {
            console.log("error:", error);
        });
};

const getUrl = (url) => {
    console.log("llego url", url);

    url.forEach((element) => {
        fetch(element.url)
            .then((response) => response.json())
            .then((json) => {
                dibujarData(json);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    });
};

// dibujar card de personajes
const dibujarData = (jsonUrl) => {
    let html = `<div class= "col-md-3 tarjeta">
        <div class="card" style="width: 13rem;">
        <img src="${jsonUrl.sprites.front_default}" class="card-img-top" alt="Img">
        <div class="card-body contenedorTexto">        
        <h5 class="card-title">${jsonUrl.name}</h5>
        <p class="card-text">Habilidad: ${jsonUrl.abilities[1].ability.name}</p>    
        </div> </div> </div>`;

    document.getElementById("datosPj").innerHTML += html;
};

//paginacion
const paginacion = (next, prev) => {
    document.getElementById("datosPj").innerHTML = "";

    let html = `<li class="page-item item ${prev ? "" : "disabled"
        }"><a class="page-link" onclick="(getData('${prev}'))">Prev</a></li> <li class="page-item item ${next ? "" : "disabled"
        }"><a class="page-link" onclick="(getData('${next}'))">Next</a></li>`;

    document.getElementById("paginacion").innerHTML = html;
};

getData(API);
