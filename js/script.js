document.addEventListener("DOMContentLoaded", () => {
  const frmPesquisa = document.querySelector("form");
    

  frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();

    const buscarPokemon = ev.target.buscarPokemon.value.toLowerCase().trim().replace(/ /g, "-");

    const carregarPokemon = () => {
      const pokemonContainer = document.querySelector("div.pokemonContainer");
      pokemonContainer.innerHTML = "";

      fetch(`https://pokeapi.co/api/v2/pokemon/${buscarPokemon}`)
        .then((response) => response.json())
        .then((data) => {
          let showPokemon = document.createElement("div");
          showPokemon.classList.add("pokemonBox");

          let showStats = document.createElement("div");
          showStats.classList.add("pokemonStatBox");

          let typesHTML = "";
          data.types.forEach((typePokemon) => {
            typesHTML += `<h3 class="${typePokemon.type.name}">${typePokemon.type.name}</h3>`;
          });
          let abilitiesHTML = "<h3 class='abilityTitle'>Habilidades: </h3>";
          data.abilities.forEach((abilityPokemon) => {
            abilitiesHTML += `<div class="ability"><h3>${abilityPokemon.ability.name.replace(
              /-/g,
              " "
            )}</h3></div>`;
          });
          let totalStats = 0;
          let statnameHTML = "";
          let statsHTML = "";
          data.stats.forEach((statsPokemon) => {
            statnameHTML += `<p class="${
              statsPokemon.stat.name
            }">${statsPokemon.stat.name.replace("-", " ")}</p>`;
            statsHTML += `<p class="${statsPokemon.stat.name}">${statsPokemon.base_stat}</p>`;
            totalStats += statsPokemon.base_stat;
          });
          showPokemon.innerHTML = `
                        <h2 class="numeroPokedex">#${data.id}</h2>
                        <h1 class="pokemonName">${data.name.replace(
                          /-/g,
                          " "
                        )}</h1>
                        <img class="imgSize" src="${
                          data.sprites.front_default
                        }"/>
                        ${typesHTML}
                        ${abilitiesHTML}
                    `;
          console.log(data.name);
          showStats.innerHTML = `
                        <h2 class ="statsTitle">Stats</h2>
                        <table>
                            <tr>
                                <td>${statnameHTML}</td>
                                <td>${statsHTML}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>${totalStats}</td>
                            </tr>
                        </table>
                        <a href="https://www.smogon.com/dex/ss/pokemon/${data.name}" target="blank" title="Veja ${data.name} no competitivo!">
                            <img class = "icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png">
                        </a>
                    `;

          pokemonContainer.appendChild(showPokemon);
          pokemonContainer.appendChild(showStats);
        })
        .catch((error)=> {
              const pokemonContainer = document.querySelector("div.pokemonContainer");
              pokemonContainer.innerHTML = "";

              let showPokemon = document.createElement("div");
              showPokemon.classList.add("pokemonError");
              showPokemon.innerHTML = `
                <h1 class = "titleError"> Pokémon não encontrado D:</h1>
                <img class = "imgError" src="https://i.redd.it/u6vz78jfhn281.png">
                <h3 class = "messageError"> Verifique se nome do pokemon está correto</h3>
              `

              pokemonContainer.appendChild(showPokemon);
        });
    };

    if (buscarPokemon === "") {
      alert("Preencha o campo!");
      return;
    }

    carregarPokemon();
  };
});
