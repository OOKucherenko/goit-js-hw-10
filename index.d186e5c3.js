let e="";document.querySelector("input#search-box").addEventListener("input",(t=>{e=t.currentTarget.value,fetch(`https://restcountries.com/v2/name/${e}?fields=name,capital,population,flags,languages`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))}));
//# sourceMappingURL=index.d186e5c3.js.map
