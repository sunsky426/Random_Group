async function make_groups(){
    check_valid;
    let names = extract_names();
    let numbers = await extract_random(1, names.length);
    let groupd = group_names(names, numbers, 6);
    console.log(groupd);
    display_output(groupd);
}

async function extract_random(min, max){
    //Extract a true random sequence of integer by sending a http request to random.org
    let url = `https://www.random.org/sequences/?min=${min}&max=${max}&col=1&format=plain&rnd=new`;
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);

    xmlHttpReq.send(null);
    let body = xmlHttpReq.responseText;

    return body.split("\n").map(Number);
}

function extract_names(){
    let raw_text = names.value;
    let text_vec = raw_text.split("\n");
    return text_vec;
}

function group_names(names, numbers){
    let group_num = parseInt($("#group").val());
    let assignd_group = numbers.map(x => x % group_num);

    let output = [...Array(group_num)].map(_x => Array());

    for (let i=0; i < names.length; i++){
        output[assignd_group[i]].push(names[i]);
    }
    
    return output;
}

function display_output(groupd){
    var $table = $("#output_table");
    $table.empty();

    var group_num = $("#group").val();
	
    var output = "";
    for(let i=0; i<group_num; i++){
        let name_list = groupd[i];
        output = output.concat(`<tr><td>Group${i}</td>`)
        for(let j=0; j<name_list.length; j++){
            output = output.concat(`<td>${name_list[j]}</td>`)
        }
        output = output.concat('</tr>')
    }
    $table.append(output);
    return;
}

function check_valid(){
    var group_num = parseInt($("#group").val());
    if(group_num < 0){group_num=0};
    
    var warningInfoHTML="";
    if(group_num == 0){
        warningInfoHTML="<span style='font-weight:bold;font-size:14pt'>Warning: </span> &nbsp;&nbsp null or zeo number of sample, please enter sample replicates (at least 1)!";
        alertModal(warningInfoHTML);
        return;
    }
}