async function make_groups(){
    alert("function called");
    let names = extract_names();
    alert(names);
    let body = await extract_random(1, names.length);
    let groupd = group_names(names, body, 6);
    //alert(groupd)
    console.log(groupd);
}

async function extract_random(min, max){
    //Extract a true random sequence of integer by sending a http request to random.org
    let url = `https://www.random.org/sequences/?min=${min}&max=${max}&col=1&format=plain&rnd=new`;

    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);

    xmlHttpReq.send(null);
    let body = xmlHttpReq.responseText;
    
    console.log(body);
    return body.split("\n").map(Number);
}

function extract_names(){
    let raw_text = names.value;
    let text_vec = raw_text.split("\n");
    return text_vec;
}

function group_names(names, numbers){
    let group_size = numbers.length % group.value;

    let output = new Array();
    let count = group_size;

    for (i of numbers){
        if (count == group_size){
            output.push(new Array());
            count = 0;
        }
        count++;
        output[output.length - 1].push(names[i]);
    }
    
    return output;
}

function display_output(){
    
}
