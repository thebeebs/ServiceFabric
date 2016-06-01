var button = document.getElementById("callApi");
var names = ["mark", "ada", "martin", "gemma", "jenny", "michelle", "jo", "joe", "jason", "kimberly", "terry", "gordon", "trisha", "kelly", "paul", "peter", "pedro", "tammy", "geoff", "keith", "carl", "pete", "craig", "kevin", "owen", "william", "ross", "usaine", "issy", "ozzy", "andy", "sandra", "frances", "harvey", "jacob", "kevin", "larry", "zac", "ben", "martin", "joni", "frank", "kate", "alex", "laura", "roz", "zoe", "emily", "nick", "natasha", "yeshi", "xai", "vicky", "victor", "david", "daisy", "ester", "quinn", "betsy", "barry"]

button.onclick = () => {
    var elm = document.createElement("div");
    elm.className = "partition";
    document.getElementById("app").appendChild(elm);
    app.getPartition(elm);
}
class Partition {
    constructor(number, element) {
        var newElement = document.createElement("div");
        newElement.className = "partition"
        element.appendChild(newElement);
        newElement.onclick = () => {
            document.getElementById("information").innerHTML = `<b>URL:</b> ${this.data.PartitionReplicaAddress} <br /><b>Partiton Key: </b> ${this.data.PartitionKey}`
        }
        this.element = newElement;
        this.data = {};
        this.generateColours();
        this.generatePosition(number);
    }
    generateColours() {
        var r = Math.floor(Math.random() * 255) + 1;
        var g = Math.floor(Math.random() * 255) + 1;
        var b = Math.floor(Math.random() * 255) + 1;
        this.element.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
    generatePosition(number) {
        var width = 100;
        var gap = 10;
        var totalWidth = width + gap;

        var height = 80;
        var totalHeight = height + gap;

        var l = 0;
        var t = 0;

        if (number <= 6) {
            l = totalWidth * number
        } else if (number > 6 && number <= 13) {
            t = (number - 6) * totalHeight
        } else if (number > 13 && number <= 19) {
            l = (number - 13) * totalWidth
            t = 7 * totalHeight;
        } else if (number > 19) {
            l = 6 * totalWidth
            t = (number - 19) * totalHeight;
        }

        this.element.style.left = l;
        this.element.style.top = t;
        this.element.style.width = width;
        this.element.style.height = height;
    }

}
class partitionService {
    constructor() {
        this.partitions = [];
    }
    addPartitions(numberToCreate, element) {
        for (var i = 0; i < numberToCreate; i++) {
            var partition = new Partition(i, element);
            this.partitions.push(partition);
        }
    }
    resetName() {
        var length = names.length;
        var rand = Math.floor(Math.random() * length)
        document.getElementById("name").value = names[rand];
    }
    getPartition(elm) {
        var sector = Math.floor(Math.random() * 26) + 1
        var url = `http://localhost:7154/api/partitions`;
        var partition = 1;
        var name = document.getElementById("name").value;

        var headers = new Headers({
            "Accept": "*/*",
            "Origin": "http://127.0.0.1:8080"
        });

        var init = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        };

        delay(Math.random() * 2000)
            .then(x => { return fetch(`${url}?lastname=${name}`, init) })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                var key = json.Partition.FriendlyPartitionId;
                var c = this.partitions[key];
                c.data = json;
                c.element.innerText = json.Partition.PartitionKey
                elm.style.backgroundColor = c.element.style.backgroundColor
                elm.style.top = c.element.style.top;
                elm.style.left = c.element.style.left;
                elm.innerText = json.Partition.PartitionKey
            })
            .then(x => { return delay(1500) })
            .then(() => { document.getElementById("partitionContainer").appendChild(elm); })
            .then(x => { this.resetName() })
    }
}
function delay(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
var app = new partitionService();
app.resetName()
app.addPartitions(26, document.getElementById("app"));