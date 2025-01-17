let animationIntervalY = null;
let animationIntervalX = null;
let total_elements_in_array = 0;

function animateY(newNode,textNode) {
    let y = newNode.getAttribute("y");
    let newY = parseFloat(y) - 3.5; 
    if (newY > 250) {
        newNode.setAttribute("y", newY);
        textNode.setAttribute("y",newY+50);
    } else {
        clearInterval(animationIntervalY); 
        animationIntervalY = null;
    }
}

function animateX(newNode,textNode) {
    let x = newNode.getAttribute("x");
    let last_x = ((total_elements_in_array)*(100)+(total_elements_in_array+1)*(10))
    let newX = parseFloat(x) - 1.5; 
    if(newX > last_x){
        newNode.setAttribute("x", newX);
        textNode.setAttribute("x",newX+50);
        console.log("animating .. ");
    }else if((parseFloat(x)+1.5)<last_x){
        newX = parseFloat(x) + 1.5; 
        newNode.setAttribute("x", newX);
        textNode.setAttribute("x",newX+50);
        console.log("animating .. ");
    }else{
        clearInterval(animationIntervalX); 
        animationIntervalX = null;
    }
}

function transport(newNode,textNode) {
    if(animationIntervalY){
        clearInterval(animationIntervalY); 
    }
    if(animationIntervalX){
        clearInterval(animationIntervalX); 
    }
    animationIntervalY = setInterval(() => animateY(newNode,textNode), 20);
    animationIntervalX = setInterval(() => animateX(newNode,textNode), 5);
}

function add_to_array(node_value) {
    const svgns = "http://www.w3.org/2000/svg";
    let newNode = document.createElementNS(svgns, "rect");
    let textNode = document.createElementNS(svgns,"text");

    textNode.setAttribute("x", "770"); 
    textNode.setAttribute("y", "500"); 
    textNode.setAttribute("fill", "white");
    textNode.setAttribute("font-size", "24");
    textNode.setAttribute("text-anchor", "middle");
    textNode.setAttribute("dominant-baseline", "middle");
    textNode.textContent = node_value;

    newNode.setAttribute("x", "720");
    newNode.setAttribute("y", "450");
    newNode.setAttribute("width", "100");
    newNode.setAttribute("height", "100");
    newNode.setAttribute("fill", "purple");
    const svg = document.getElementById("main_SVG");
    svg.appendChild(newNode);
    svg.appendChild(textNode);
    transport(newNode,textNode);
}

function get_number() {
    return document.getElementById("number_entered").value;
}

document.getElementById("insertion").addEventListener("click", () => {
    let x = get_number();
    total_elements_in_array++;
    add_to_array(x);
});
