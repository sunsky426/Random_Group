async function make_groups(){
    alert("function called")
    let names = extract_names();
    alert(names)
    let body = await extract_random(1, names.length);
    let groupd = group_names(names, body, 6);
    //alert(groupd)
    console.log(groupd)
}

async function extract_random(min, max){
    //Extract a true random sequence of integer by sending a http request to random.org
    let url = `https://www.random.org/sequences/?min=${min}&max=${max}&col=1&format=plain&rnd=new`;
    alert(url);

    let body = await fetch(url)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            return data; // this will be a string
        });
    
    console.log(body)
    return body.split("\n").map(Number)
}

function extract_names(){
    let raw_text = names.value;
    let text_vec = raw_text.split("\n");
    return text_vec
}

function group_names(names, numbers){
    let group_num = group.value;
    let asignd_group = numbers.map(function(x){x % group_num});

    let output;

    for(i of range(0, names.length)){
        output[asignd_group[i]].push(names[i]);
    }
    
    return output
}
