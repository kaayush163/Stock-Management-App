var selectedRow = null
let id="efd3283af0444f2dae23b9eca93ee08b";
let url=`https://crudcrud.com/api/${id}/data`;

window.addEventListener('DOMContentLoaded', async() => {   //on loading screen
      let x;
      try{
        x=await axios.get(url);
        console.log(x);
      }
      catch{
       console.log('ERROR');
      }

      let [a] = await Promise.all([x]);    // a is an object which stores array of object values in it
      console.log(a);
      for(let i=0;i<a.data.length;i++){
        insertNewRecord(a.data[i])
       }
})

async function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        let t;
        if (selectedRow == null){
            console.log(selectedRow);
            try{
                t=await axios.post(url,formData)

                insertNewRecord(t.data)
               // console.log(t); same as 10 line mei x ka aa rha tha
               //console.log(t._id); undefined

               // insertNewRecord(formData)   //to call function showUser and pass the data to that
            }
           catch{
            console.log('ERROR');
           }
            // insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}

        // let [a] = await Promise.all([t]);    // a is an object which stores array of object values in it
        // console.log(a);
        // for(let i=0;i<a.data.length;i++){
        //   insertNewRecord(a.data[i])
        // }

        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["product"] = document.getElementById("product").value;
    formData["productCode"] = document.getElementById("productCode").value;
    formData["qty"] = document.getElementById("qty").value;
    formData["perPrice"] = document.getElementById("perPrice").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    console.log(data._id);
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    //console.log(table);
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.product;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.productCode;
    cell3 = newRow.insertCell(2);
	cell3.innerHTML = data.qty;
    cell4 = newRow.insertCell(3);
	cell4.innerHTML = data.perPrice;
    cell4 = newRow.insertCell(4);

    console.log(newRow);
    let newCandyQty=[];
    cell4.innerHTML = `<button onClick="buy1('${data.product}','${data.productCode}','${data.qty}','${data.perPrice}','${data._id}','${newCandyQty}');del(this)">Buy1</button> 
                       <button onClick="buy2('${data.product}','${data.productCode}','${data.qty}','${data.perPrice}','${data._id}','${newCandyQty}');del(this)">Buy2</button> 
                       <button onClick="buy3('${data.product}','${data.productCode}','${data.qty}','${data.perPrice}','${data._id}','${newCandyQty}');del(this)">Buy3</button>
                       <button onClick="onDelete('${data._id}') ; del(this)">DEL</button>`;
};

function buy1(candyName,candyType,candyQty,candyPrice,userId,newCandyQty){
    
    newCandyQty={
        product:candyName,
        productCode:candyType,
        qty:candyQty-1,
        perPrice:candyPrice
    }

    onDelete(userId);
    post(newCandyQty);
};

function buy2(candyName,candyType,candyQty,candyPrice,userId,newCandyQty){

    newCandyQty={
        product:candyName,
        productCode:candyType,
        qty:candyQty-2,
        perPrice:candyPrice
    }

    onDelete(userId);
    post(newCandyQty);
};

function buy3(candyName,candyType,candyQty,candyPrice,userId,newCandyQty){

    newCandyQty={
        product:candyName,
        productCode:candyType,
        qty:candyQty-3,
        perPrice:candyPrice
    }

    onDelete(userId);
    //del(tr);
    post(newCandyQty);
};

async function post(newCandyQty){
    let t;
    try{
        t = await axios.post(url,newCandyQty);
    }

    catch{
        console.log('ERROR');
    }

    let[l]=await Promise.all([t]);
    console.log(l);
    insertNewRecord(l.data);
}

//Delete the data
async function onDelete(td) {
   // if (confirm('Do you want to delete this record?')) {
        let t;
        console.log(td);
        try{
            //await axios.delete(`https://crudcrud.com/api/7c8ef40b97aa45f793231598ac16b85b/data/${td}`)
            await axios.delete(url+'/'+td)
            //remove(td);
        }
        catch{
                console.log('ERROR')
        }
        let [a]= await Promise.all([t]);
        console.log(a);
        
        //console.log(res);
              //removeUser(td)
              // parentEl.removeChild(childEl)
        //remove(td);
        //tr.remove();
        //row = td.parentElement.parentElement;
       // document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    //}
}

async function del(tr){

    let row = tr.parentNode.parentNode;

    //row.parentNode.removeChild(row);
    document.getElementById('storeList').deleteRow(row.rowIndex);
}

//Reset the data
function resetForm() {
    document.getElementById("productCode").value = '';
    document.getElementById("product").value = '';
    document.getElementById("qty").value = '';
    document.getElementById("perPrice").value = '';
    selectedRow = null;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("productCode").value = selectedRow.cells[0].innerHTML;
    document.getElementById("product").value = selectedRow.cells[1].innerHTML;
    document.getElementById("qty").value = selectedRow.cells[2].innerHTML;
    document.getElementById("perPrice").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}