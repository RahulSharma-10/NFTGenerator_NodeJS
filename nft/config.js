const fs = require("fs");

const dir = __dirname;
const height = 320;
const width= 320;

console.log(dir);

const rarity = [
    {key:"", val:"original"},
    {key:"", val:"rare"},
    {key:"", val:"super rare"}
];
const addRarity = _str => {
    let itemRarity;
  
    rarity.forEach((r) => {
      if (_str.includes(r.key)) {
        itemRarity = r.val;
      }
    });
  
    return itemRarity;
  };  
  const cleanName = _str => {
    let name = _str.slice(0, -4);
    rarity.forEach((r) => {
      name = name.replace(r.key, "");
    });
    return name;
  };


const getElements = path => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        return {
          id: index + 1,
          name: cleanName(i),
          fileName: i,
          rarity: addRarity(i),
        };
      });
  };

const layers = [
    {
    id: 1,
    name: "face", 
    location:  `${dir}/face/`,
    elements: getElements(`${dir}/face/`),
    position: {x: 0, y: 0},
    size: {width: 320, height:320},
    },
    {
        id: 2,
        name: "tee", 
        location:  `${dir}/tee/`,
        elements: getElements(`${dir}/tee/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    {
        id: 3,
        name: "mouth", 
        location:  `${dir}/mouth/`,
        elements: getElements(`${dir}/mouth/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    {
        id: 4,
        name: "eyes", 
        location:  `${dir}/eyes/`,
        elements: getElements(`${dir}/eyes/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    {
        id: 5,
        name: "hair", 
        location:  `${dir}/hair/`,
        elements: getElements(`${dir}/hair/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    {
        id: 6,
        name: "earrings", 
        location:  `${dir}/earrings/`,
        elements: getElements(`${dir}/earrings/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    {
        id: 7,
        name: "headgear", 
        location:  `${dir}/headgear/`,
        elements: getElements(`${dir}/headgear/`),
        position: {x: 0, y: 0},
        size: {width: 320, height:320},
    },
    
  {
    id: 8,
    name: "eyewear", 
    location:  `${dir}/eyewear/`,
    elements: getElements(`${dir}/eyewear/`),
    position: {x: 0, y: 0},
    size: {width: 320, height:320},
},
{
  id: 9,
  name: "beard", 
  location:  `${dir}/beard/`,
  elements: getElements(`${dir}/beard/`),
  position: {x: 0, y: 0},
  size: {width: 320, height:320},
},
{
  id: 10,
  name: "extra", 
  location:  `${dir}/extra/`,
  elements: getElements(`${dir}/extra/`),
  position: {x: 0, y: 0},
  size: {width: 320, height:320},
},
]

module.exports = {layers, width, height};