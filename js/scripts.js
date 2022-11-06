// Variables globales
let compteur = 0 // Compteur qui permettra de savoir sur quelle slide nous sommes
let timer, elements, slides, slideWidth

window.onload = () => {
    // On r�cup�re le conteneur principal du diaporama
    const diapo = document.querySelector(".diapo")

    // On r�cup�re le conteneur de tous les �l�ments
    elements = document.querySelector(".elements")

    // On r�cup�re un tableau contenant la liste des diapos
    slides = Array.from(elements.children)

    // On calcule la largeur visible du diaporama
    slideWidth = diapo.getBoundingClientRect().width

    // On r�cup�re les deux fl�ches
    let next = document.querySelector("#nav-droite")
    let prev = document.querySelector("#nav-gauche")

    // On met en place les �couteurs d'�v�nements sur les fl�ches
    next.addEventListener("click", slideNext)
    prev.addEventListener("click", slidePrev)

    // Automatiser le diaporama
    timer = setInterval(slideNext, 4000)

    // G�rer le survol de la souris
    diapo.addEventListener("mouseover", stopTimer)
    diapo.addEventListener("mouseout", startTimer)

    // Mise en oeuvre du "responsive"
    window.addEventListener("resize", () => {
        slideWidth = diapo.getBoundingClientRect().width
        slideNext()
    })
}

/**
 * Cette fonction fait d�filer le diaporama vers la droite
 */
function slideNext(){
    // On incr�mente le compteur
    compteur++

    // Si on d�passe la fin du diaporama, on "rembobine"
    if(compteur == slides.length){
        compteur = 0
    }

    // On calcule la valeur du d�calage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}

/**
 * Cette fonction fait d�filer le diaporama vers la gauche
 */
function slidePrev(){
    // On d�cr�mente le compteur
    compteur--

    // Si on d�passe le d�but du diaporama, on repart � la fin
    if(compteur < 0){
        compteur = slides.length - 1
    }

    // On calcule la valeur du d�calage
    let decal = -slideWidth * compteur
    elements.style.transform = `translateX(${decal}px)`
}

/**
 * On stoppe le d�filement
 */
function stopTimer(){
    clearInterval(timer)
}

/**
 * On red�marre le d�filement
 */
function startTimer(){
    timer = setInterval(slideNext, 4000)
}