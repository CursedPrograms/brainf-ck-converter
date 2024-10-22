function textToBF(text) {
    let output = "";
    let currentValue = 0;
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode > currentValue) {
            output += "+".repeat(charCode - currentValue);
        } else if (charCode < currentValue) {
            output += "-".repeat(currentValue - charCode);
        }
        output += ".";
        currentValue = charCode;
    }
    return output;
}

function bfToText(bf) {
    let output = "";
    let memory = new Array(30000).fill(0);
    let pointer = 0;
    let i = 0;
    while (i < bf.length) {
        switch (bf[i]) {
            case '>':
                pointer++;
                break;
            case '<':
                pointer--;
                break;
            case '+':
                memory[pointer]++;
                break;
            case '-':
                memory[pointer]--;
                break;
            case '.':
                output += String.fromCharCode(memory[pointer]);
                break;
            case ',':
                // Input not implemented in this simple version
                break;
            case '[':
                if (memory[pointer] === 0) {
                    let loop = 1;
                    while (loop > 0) {
                        i++;
                        if (bf[i] === '[') loop++;
                        if (bf[i] === ']') loop--;
                    }
                }
                break;
            case ']':
                if (memory[pointer] !== 0) {
                    let loop = 1;
                    while (loop > 0) {
                        i--;
                        if (bf[i] === '[') loop--;
                        if (bf[i] === ']') loop++;
                    }
                }
                break;
        }
        i++;
    }
    return output;
}

function convertToBF() {
    const input = document.getElementById("input").value;
    const bfOutput = textToBF(input);
    document.getElementById("output").value = bfOutput;
}

function convertFromBF() {
    const input = document.getElementById("input").value;
    const textOutput = bfToText(input);
    document.getElementById("output").value = textOutput;
}