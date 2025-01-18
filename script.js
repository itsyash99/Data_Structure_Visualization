let animationInProgress = false;
let array_elements = [];
let animationIntervalY = null;
let animationIntervalX = null;
let total_elements_in_array = 0;

function transport(newNode, textNode) {
    const insertButton = document.getElementById("insertion");
    const deleteButton = document.getElementById("deletion");
    insertButton.disabled = true; 
    deleteButton.disabled = true;
    animationIntervalY = setInterval(() => animateY(newNode, textNode), 20);
    animationIntervalX = setInterval(() => animateX(newNode, textNode), 5);
}

function animateX(newNode, textNode) {
    let x = newNode.getAttribute("x");
    let last_x = total_elements_in_array * (100 + 10);
    let newX = parseFloat(x) - 1.5;

    if (newX > last_x) {
        newNode.setAttribute("x", newX);
        textNode.setAttribute("x", newX + 50);
    } else if (parseFloat(x) + 1.5 < last_x) {
        newX = parseFloat(x) + 1.5;
        newNode.setAttribute("x", newX);
        textNode.setAttribute("x", newX + 50);
    } else {
        clearInterval(animationIntervalX);
        animationIntervalX = null;
        checkAnimationCompletion(); 
    }
}

function animateY(newNode, textNode) {
    let y = newNode.getAttribute("y");
    let newY = parseFloat(y) - 3.5;

    if (newY > 250) {
        newNode.setAttribute("y", newY);
        textNode.setAttribute("y", newY + 50);
    } else {
        clearInterval(animationIntervalY);
        animationIntervalY = null;
        checkAnimationCompletion(); 
    }
}

function checkAnimationCompletion() {
    const insertButton = document.getElementById("insertion");
    const deleteButton = document.getElementById("deletion");
    if (!animationIntervalX && !animationIntervalY) {
        insertButton.disabled = false; 
        deleteButton.disabled = false; 
    }
}

function add_to_array(node_value) {
    if (isNaN(node_value) || node_value.trim() === "") {
        alert("Please enter a valid number.");
        return;
    }
    const svgns = "http://www.w3.org/2000/svg";
    let newNode = document.createElementNS(svgns, "rect");
    let textNode = document.createElementNS(svgns, "text");

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
    newNode.setAttribute("rx", "15"); 
    newNode.setAttribute("ry", "15");

    const svg = document.getElementById("main_SVG");
    svg.appendChild(newNode);
    svg.appendChild(textNode);
    array_elements.push({newNode,textNode});
    transport(newNode, textNode);
}

function deleteLastElement(){
    if(array_elements.length == 0 || animationInProgress)return;
    const lastelement = array_elements.pop();
    const svg = document.getElementById("main_SVG");
    svg.removeChild(lastelement.newNode);
    svg.removeChild(lastelement.textNode);
    total_elements_in_array--;
}

function get_number() {
    return document.getElementById("number_entered").value.trim();
}

document.getElementById("insertion").addEventListener("click", () => {
    let inputValue = document.getElementById("number_entered").value;
    total_elements_in_array++;
    add_to_array(inputValue);
});

document.getElementById("deletion").addEventListener("click", () => {
    deleteLastElement();
});
