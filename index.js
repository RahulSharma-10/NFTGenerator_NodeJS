
import { writeFileSync } from "fs";
const myArgs = process.argv.slice(2);
import { createCanvas, loadImage } from "canvas";
import { layers, width, height } from "./nft/config.js";
import { log } from "console";
import { decode } from "punycode";
const edition = myArgs.length> 0 ? Number(myArgs[0]): 1;
const Exists = new Map();

var metadata = [];
var attributes = [];
var hash = [];
var decodedhash= [];
var dnaList = [];

//Redraw and save the layer, Need to observe to save it.

const savelayer = (_canvas, _edition) => {
    
    writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png")); //Converting our Canvas to buffer
    // console.log("Image Created");
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

const drawlayer = async (_layer, _edition, canvas, ctx) => {

    const random_idx = Math.floor(Math.random()*(_layer.elements.length));


    let element = _layer.elements[random_idx];
    // console.log(element);
    
    if(element){

        addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    
    ctx.drawImage(image, 
        _layer.position.x,
        _layer.position.y, 
        _layer.size.width, 
        _layer.size.height); // We can adjust, the x, y, h, w limits to get some parts
    }
    log(`I created the ${_layer.name} and choose ${element.name}`);
    savelayer(canvas, _edition);
    
};

const createDNA = (_len) => {
    
    let num_zero = _len*2-1;
    let randNum = Math.floor(Number(`1e${num_zero}`) + Math.random()*Number(`9e${num_zero}`));
    return randNum;
};

const writeMetaData = () => {
    writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
};

const createNFT = () => {
    
    let editioncount = 1;
    while(editioncount<=edition)
    {
        // let canvas = createCanvas(width,height);
        // let ctx = canvas.getContext("2d");
        // layers.forEach((layer) => {
        //     drawlayer(layer, i, canvas, ctx);
        // }); 
        
        log(`Random Number is ${createDNA()}`);
        editioncount++;
    }

createNFT();
writeMetaData();