const publicaciones = document.querySelector(".publicaciones");
let contador = 0;


const createPublicationCode = (name, content) => {
  let container = document.createElement("div");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let comentarios = document.createElement("div");
  let btnComentario = document.createElement("input");
  let btnEnviar = document.createElement("input");

  container.classList.add("publicacion");
  comentarios.classList.add("comentarios");
  btnComentario.classList.add("comentario");
  btnEnviar.classList.add("enviar");

  btnComentario.setAttribute("placeholder", "Introduce tu comentario");

  h3.textContent = name;
  p.textContent = content;
  btnEnviar.setAttribute("Type","submit");
  btnEnviar.textContent = "Enviar";

  comentarios.appendChild(btnComentario); 
  comentarios.appendChild(btnEnviar);

  container.appendChild(h3);
  container.appendChild(p);
  container.appendChild(comentarios);

  return container;
};



const cargarMasPublicaciones = (entry) =>{
  if(entry[0].isIntersecting){
    cargarPublicaciones(4);
  }
}

const observador = new IntersectionObserver(cargarMasPublicaciones);

const cargarPublicaciones = async num =>{
  const request = await fetch("informacion.txt");
  const content = await request.json();
  const arr = content.content;
  const fragmento = document.createDocumentFragment();
  for (let i = 0; i < num; i++) {
    if(arr[contador] != undefined){
      const publicacionNueva = createPublicationCode(arr[contador].nombre,arr[contador].contendio);
    fragmento.appendChild(publicacionNueva);
    contador++;
    if(i == num-1){
      observador.observe(publicacionNueva);
    }
    }else{
      let noMore = document.createElement("h3");
      noMore.textContent = "No hay mas publicaciones";
      noMore.classList.add("no-more");
      fragmento.append(noMore);
      publicaciones.appendChild(fragmento);
      break;
    }
  }

  publicaciones.appendChild(fragmento);

  const textArea = document.querySelector(".comentario");
textArea.addEventListener("click", ()=>{
    textArea.setAttribute("placeholder", "");
});
  
}

cargarPublicaciones(4);






