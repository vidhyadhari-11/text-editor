document.addEventListener("DOMContentLoaded", () => {
    const fontname = document.getElementById("fontname");
    const fontsize = document.getElementById("fontsize");
    const addtextbtn = document.getElementById("addtextbtn");
    const container = document.getElementById("container");

    const undobtn = document.getElementById("undobtn");
    const redobtn = document.getElementById("redobtn");

    const boldbtn = document.getElementById("boldbtn");
    const italicbtn = document.getElementById("italicbtn");
    const underlinebtn = document.getElementById("underlinebtn");
    const aligncenterbtn = document.getElementById("aligncenterbtn");

    let fontlist = ["Arial", "Verdana", "Times New Roman", "Garamond", "Helvetica", "Georgia", "Courier New","Roboto","Open Sans","Lato"];
    let undoStack = [];
    let redoStack = [];
    let currentinputelement = null;

    fontlist.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontname.appendChild(option)
    })

    for (let i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontsize.appendChild(option);

    }


    //default font size
    fontsize.value = 3;

    function savestate(){
        if(currentinputelement){ // if that element is present
            undoStack.push({
                text: currentinputelement.value,
                
            });
            redoStack = [];
        }
    }

    undobtn.addEventListener("click", () => {
        if(undoStack.length > 0){ //undostack is an array if there is a state then undostack length wont be 0
            const laststate = undoStack.pop();
            redoStack.push({
                text: currentinputelement.value,
                
            });
            currentinputelement.value = laststate.text;
           
        }
    })

    redobtn.addEventListener("click", () => {
        if(redoStack.length > 0){
            const laststate = redoStack.pop();
            undoStack.push({
                text: currentinputelement.value,
                
            })
            currentinputelement.value = laststate.text;
            
        }
    })


    addtextbtn.addEventListener("click", () => {
        const inputelement = document.createElement("input");
        inputelement.classList.add("movable-input");
        inputelement.type = "text";
        // inputelement.value = "click me"
        inputelement.style.userSelect = "text";
        inputelement.style.top = "50px";
        inputelement.style.left = "50px";

        container.appendChild(inputelement);

        inputelement.addEventListener("input", () => {
            inputelement.style.width = `${Math.max(inputelement.value.length * 7, 5)}px`;
        })

        makemovable(inputelement);
        setcurrenttextelement(inputelement);

    })

    

    function makemovable(element) {
        let isdragging = false;
        let offsetX = 0;
        let offsetY = 0;

        element.addEventListener("mousedown", (e) => {
            isdragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            
            element.style.cursor = "grabbing";
        });

        element.addEventListener("mousemove", (e) => {
            if (isdragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;

                



                element.style.left = `${x}px`;



                element.style.top = `${y}px`;

            }
        });

        element.addEventListener("mouseup", (e) => {
            if(isdragging){

                isdragging = false;
                element.style.cursor = "pointer";
            }
        });

    }

    function setcurrenttextelement(element){
        currentinputelement = element;
        currentinputelement.focus();  //focus is a built in machine that gives focus
        savestate();

        currentinputelement.addEventListener("input", ()=> {
            savestate();
        })
    }

    

    boldbtn.addEventListener("click", () => {
        if(currentinputelement){
            currentinputelement.select();
            currentinputelement.style.fontWeight = currentinputelement.style.fontWeight === "bold" ? "normal" : "bold";
            savestate();
        }
    })

    italicbtn.addEventListener("click", () => {
        if(currentinputelement){
            currentinputelement.select();
            currentinputelement.style.fontStyle = currentinputelement.style.fontStyle === "italic" ? "normal" : "italic";
            savestate();
        }
    })

    underlinebtn.addEventListener("click", () => {
        if(currentinputelement){
            currentinputelement.style.textDecoration = currentinputelement.style.textDecoration === "underline"? "none" : "underline";
            savestate();
        }
    })

    fontname.addEventListener("change", () => {
        if(currentinputelement){
            currentinputelement.style.fontFamily = fontname.value
            savestate();
        }
    })

    fontsize.addEventListener("change", () => {
        if(currentinputelement){
            currentinputelement.style.fontSize = `${fontsize.value}px`;
            savestate();
        }
    })

    aligncenterbtn.addEventListener("click", () => {
        if(currentinputelement){
            currentinputelement.style.textAlign = currentinputelement.style.textAlign === "center" ? "left" : "center";
            savestate();
        }
    })
    


});
