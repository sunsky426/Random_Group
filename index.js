async function make_groups(){
    $("body").css("cursor", "progress");
    let names = extract_names();
    if (!check_valid(names)){
        $("body").css("cursor", "default");
        return;
    };
    let numbers = await extract_random(1, names.length);
    let groupd = group_names(names, numbers, 6);
    console.log(groupd);
    display_output(groupd);
    $("body").css("cursor", "default");
    return;
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
    var $space = $("#output");
    $space.empty();

    var group_num = $("#group").val();
	
    var output = "";
    for(let i=0; i<group_num; i++){
        let name_list = groupd[i];

        if(i != 0){
            output = output.concat("<hr style = 'color: #6d7993; width: 95%; margin-top: 0px; margin-bottom: 0px'></hr>");
        }
        output = output.concat(`<div class='name_list'><p style='margin-top:0px; margin-bottom:0px; font-weight: bold'><i class="fa fa-users"></i>&nbsp; Group ${i + 1}:</p><p style="width:100%; margin-left:10px; margin-right:10px; margin-top:0px; margin-bottom:10px">`)
        for(let j=0; j<name_list.length; j++){
            output = output.concat(`<nobr>${name_list[j]}</nobr> &emsp;`)
        }
        output = output.concat('</p></div>')
    }
    $space.append(output);
    return;
}

function check_valid(text_vec){
    let group_num = $("#group").val();
    let name_len = text_vec.length;
    
    var warningInfoHTML="";
    
    if(name_len <= 1){
        warningInfoHTML=`<span style='font-weight:bold;font-size:14pt'>Warning: </span> Why bother making groups when there's only ${name_len} student in the class?`;
    }else if(!group_num.match("^[0-9]+$")){
        warningInfoHTML="<span style='font-weight:bold;font-size:14pt'>Warning: </span> Number of groups must be an positive integer";
    }else if(group_num > name_len){
        warningInfoHTML="<span style='font-weight:bold;font-size:14pt'>Warning: </span> Number of Students cannot be lower than the number of groups";
    }else{
        return true;
    }
    alertModal(warningInfoHTML);
    return false;
}

function reset_output(){
    $("#output_space").empty();
}

function alertModal(alertTxt){
    document.getElementById("modalAlert-P").innerHTML=alertTxt;	
    $("#modalAlert").modal({closeExisting: false});
}

function collapse(id_num){
    var content = $(`#collapsable_content_${id_num}`);
    if(content.css("display") == "none"){
        content.css("display", "block");
    }else{
        content.css("display", "none");
    }
}


var doc = new jsPDF();

var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#save').click(function () {
    doc.fromHTML($('#output_space').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
});
