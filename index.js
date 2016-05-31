var button = document.getElementById("callApi");

button.onclick = () => {
    var elm = document.createElement("div");
    elm.className = "partition";
    document.getElementById("app").appendChild(elm);     
    
    
    app.getPartition(elm);
    
}

class Partition{
    constructor(number, element){
        var newElement = document.createElement("div");
        newElement.className = "partition"
        element.appendChild(newElement);
        newElement.onclick = ()=> {
          document.getElementById("information").innerHTML = `<b>URL:</b> ${this.data.PartitionReplicaAddress} <br /><b>Partiton Key: </b> ${this.data.PartitionKey}`
      } 
      
        this.element = newElement;  
        this.data = {};
        this.generateColours();
        this.generatePosition(number); 
            
    }
    generateColours(){
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;        
        this.element.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
    
    generatePosition(number){
      var width = 100;
      var gap = 10;
      var totalWidth = width + gap;
      
      var height = 80;
      var totalHeight = height + gap;
      
      // Given 0 t = 0, l = 0
      // Given 7 t = , l = 
      
      var l = totalWidth * number
      var t = 0;
      
      if (number > 6){
          l = 0;
          t = (number - 6) * totalHeight
      }
      
      if (number > 13){
          l = (number - 13) * totalWidth
          t = 7 * totalHeight;
      }
      
      if (number > 19){
          l = 6 * totalWidth
          t = (number - 19) * totalHeight;
      }      
      
      this.element.style.left = l;
      this.element.style.top = t;
      this.element.style.width = width;
      this.element.style.height = height;     
      
    }
    
}

class partitionService{
    constructor(){      
      this.partition = [];
    }
    addPartitions(numberToCreate, element){
        for (var i = 0; i < numberToCreate; i++){
            var partition = new Partition(i, element);
            this.partition.push(partition);
        }        
    }
    getPartition(elm){
        //Random number between 1 and 3
        var sector = Math.floor(Math.random() * 26) + 1  
        var url = `backend/back.json`;        
        var partition = 1;
        var name = document.getElementById("name").value;
        delay(Math.random() * 2000)
        .then(x => {return fetch(`${url}?${name}`)})
        .then(response => response.json())
        .then(json => { partition = sector; 
            var c = this.partition[partition - 1];
            c.data = json;
            c.element.innerText = json.PartitionKey
            elm.style.backgroundColor= c.element.style.backgroundColor            
            elm.style.top = c.element.style.top; elm.style.left = c.element.style.left; elm.innerText = json.PartitionKey})
        .then(x => {return delay(1800)})
        .then(() => { document.getElementById("partitionContainer").appendChild(elm); })    
        }
}



function delay(time){
    return new Promise(function(resolve,reject){
    setTimeout(function(){
       resolve();
    }, time);
});}
 
 
 var app = new partitionService();
app.addPartitions(26, document.getElementById("app"));