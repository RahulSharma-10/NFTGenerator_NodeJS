
const fs= require("fs");
const myArgs = process.argv.slice(2);
const {createCanvas, loadImage} = require("canvas");
const {layers, width, height} = require("./layers/config.js");
const canvas = createCanvas(width,height);
const console = require("console");
const { decode } = require("punycode");
const ctx = canvas.getContext("2d");
const edition = myArgs.length> 0 ? Number(myArgs[0]): 1;

var metadata = [];
var attributes = [];
var hash = [];
var decodedhash= [];

//Redraw and save the layer, Need to observe to save it.

const savelayer = (_canvas, _edition) => {
    fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png")); //Converting our Canvas to buffer
    console.log("Image Created");
}

const addMetaData = (_edition) => {

    let DateTime = Date.now();
    let tempMetaData = {
        hash: hash.join(""),
        decodedhash: decodedhash,
        edition: "",
        date: DateTime,
        attributes: attributes,
    };
    metadata.push(tempMetaData);
    attributes= [];
    hash= [];
    decodedhash= [];

};

const addAttributes = (_element, _layer) => {
    let tempAttr = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    }
    attributes.push(tempAttr);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedhash.push({[_layer.id]: _element.id});

};

const drawlayer = async (_layer, _edition) => {

    const random_idx = Math.floor(Math.random()*_layer.elements.length);
    let element = _layer.elements[random_idx];
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);

    ctx.drawImage(image, 
        _layer.position.x,
        _layer.position.y, 
        _layer.size.width, 
        _layer.size.height); // We can adjust, the x, y, h, w limits to get some parts

    console.log(`I created the ${_layer.name} and choose ${element.name}`);
    savelayer(canvas, _edition);
};

for(let i=1; i<=edition;i++)
{
    layers.forEach(layer => {
        // console.log(layer);
        drawlayer(layer, i);
    })
    addMetaData(i);

    console.log("Creating edition " + i);
}

fs.readFile("./output/_metadata.json", (err, data) => {
    if(err) throw err;
    fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
});