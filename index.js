const fs= require("fs");
const myArgs = process.argv.slice(2);
const {createCanvas, loadImage} = require("canvas");
const {layers, width, height} = require("./nft/config.js");
const canvas = createCanvas(width,height);
const ctx = canvas.getContext("2d");
const console = require("console");
const { decode } = require("punycode");
const edition = myArgs.length> 0 ? Number(myArgs[0]): 1;
const Exists = new Map();

var metadataList = [];
var attributesList = [];

var dnaList = [];

//Redraw and save the layer, Need to observe to save it.

const saveImage = ( _editionCount) => {
    
    fs.writeFileSync(`./output/${_edition}.png`, canvas.toBuffer("image/png")); //Converting our Canvas to buffer
    // console.log("Image Created");
}

const addMetaData = (_dna, _edition) => {

    let DateTime = Date.now();
    let tempMetaData = {
        dna: _dna,
        edition: _edition,
        date: DateTime,
        attributes: attributesList,
    };
    metadataList.push(tempMetaData);
    dnaList.push(_dna);
    attributesList= [];
    
};

const addAttributes = (_element) => {
    let selectedElement = _element.layer.selectedElement;
    attributesList.push({
        name: selectedElement.name,
        rarity: selectedElement.rarity,
    });
};

const loadLayerImg = async (_layer) => {

    return new Promise(async(resolve) => {

        const image = await loadImage(`${_layer.location}${_layer.selectedElement.fileName}`);
        resolve({layer: _layer, loadedImage: image})
    });

    
};

const drawElement = (_element) => {
    console.log(_element);
    
    ctx.drawImage(
        _element.loadimage, 
        _element.layer.position.x,
        _element.layer.position.y, 
        _element.layer.size.width, 
        _element.layer.size.height, // We can adjust, the x, y, h, w limits to get some parts
    );
    addAttributes(_element);
};

const constructLayerToDna = (_dna, _layer) => {

    let DnaSegment = _dna.toString().match(/.{1,2}/g);
    let mappedDnaToLayers = _layer.map((layer) =>{
        let selectedElement = layer.elements[parseInt(DnaSegment)% layer.elements.length]
        return {
            location:  layer.location,
            position: layer.position,
            size: layer.size,
            selectedElement: selectedElement,
        };
    });
    return mappedDnaToLayers;
};

const checkDNA = (_DnaList = [], val) => {
   
    let found=0;
    let size=  _DnaList.length;
    for(var i=0;i<size;i++)
    {
        if(_DnaList[i]===val)
        {
            found= 1;
            break;
        }
    }

    return (found==0)?true:false;
};

const createDNA = (_len) => {
    
    let num_zero = _len*2-1;
    let randNum = Math.floor(Number(`1e${num_zero}`) + Math.random()*Number(`9e${num_zero}`));
    return randNum;
};

const writeMetaData= (_data) => {
    fs.writeFileSync("./output/_metadata.json", _data);
};

const createNFT = () => {

    writeMetaData(""); //Clears up the file
    let editioncount = 1;
    const layers_len = layers.length;

    while (editioncount <= edition) {

        let newDNA= createDNA(layers_len);


        if(checkDNA(dnaList, newDNA)){

            let result = constructLayerToDna(newDNA, layers);
            let loadedElements = []; //promise array

           result.forEach(layer => {
              loadedElements.push(loadLayerImg(layer)); //promise
           });
            
           Promise.all(loadedElements).then(elementArray => {
                elementArray.forEach(element =>{
                    drawElement(element);
                })
                saveImage( editioncount);
                addMetaData(newDNA, editioncount);
                console.log(`Created edition: ${editioncount} with DNA: ${newDNA}`);
           });
            editioncount++;

        }else{
            console.log('not generated');
        }
        writeMetaData(JSON.stringify(metadataList));
    }
};


createNFT();


