// https://dept.dokkyomed.ac.jp/dep-m/macro/mammal/en/genus_list.html
// copy([...document.querySelectorAll(".TaxonSci>a")].map(x=>x.innerText))
const randomBytes = (N) => globalThis.crypto.getRandomValues(new Uint8ClampedArray(N));

const MAX = 2**16;
const genuses = [
  "Acomys",
  "Aepyceros",
  "Aepyprymnus",
  "Agouti",
  "Ailurus",
  "Allactaga",
  "Alopex",
  "Alouatta",
  "Antidorcas",
  "Antilocapra",
  "Antilope",
  "Aonyx",
  "Aotus",
  "Aplodontia",
  "Arctocephalus",
  "Atelerix",
  "Ateles",
  "Bassariscus",
  "Bos",
  "Boselaphus",
  "Brachyteles",
  "Bradypus",
  "Callicebus",
  "Callithrix",
  "Callosciurus",
  "Camelus",
  "Canis",
  "Cannomys",
  "Capra",
  "Capricornis",
  "Castor",
  "Cavia",
  "Cebuella",
  "Cebus",
  "Cercocebus",
  "Cercopithecus",
  "Cervus",
  "Chinchilla",
  "Choloepus",
  "Coendou",
  "Colobus",
  "Cricetomys",
  "Cricetus",
  "Crocidura",
  "Crocuta",
  "Cynictis",
  "Cynocephalus",
  "Cynomys",
  "Cynopterus",
  "Dactylopsila",
  "Dasyprocta",
  "Dasypus",
  "Dasyuroides",
  "Didelphis",
  "Dinomys",
  "Dolichotis",
  "Dryomys",
  "Dusicyon",
  "Echinops",
  "Eidolon",
  "Elaphodus",
  "Elephas",
  "Ellobius",
  "Enhydra",
  "Epomophorus",
  "Equus",
  "Erethizon",
  "Erinaceus",
  "Erythrocebus",
  "Euphractus",
  "Felis",
  "Galago",
  "Genetta",
  "Giraffa",
  "Glirulus",
  "Gorilla",
  "Gulo",
  "Hemicentetes",
  "Hemiechinus",
  "Hippopotamus",
  "Hippotragus",
  "Homo",
  "Hyaena",
  "Hydrochaerus",
  "Hylobates",
  "Hystrix",
  "Ictonyx",
  "Jaculus",
  "Lagenorhynchus",
  "Lagidium",
  "Lagostomus",
  "Lagothrix",
  "Lama",
  "Lemur",
  "Leontopithecus",
  "Lepus",
  "Loris",
  "Macaca",
  "Macropus",
  "Macroscelides",
  "Mandrillus",
  "Marmota",
  "Martes",
  "Mayailurus",
  "Meles",
  "Mephitis",
  "Microtus",
  "Miopithecus",
  "Mogera",
  "Muntiacus",
  "Mustela",
  "Myocastor",
  "Myrmecophaga",
  "Nandinia",
  "Nannospalax",
  "Nasua",
  "Neofelis",
  "Nyctereutes",
  "Nycticebus",
  "Ochotona",
  "Ondatra",
  "Oryctolagus",
  "Otocyon",
  "Otolemur",
  "Ovis",
  "Paguma",
  "Pan",
  "Panthera",
  "Papio",
  "Paradoxurus",
  "Paraxerus",
  "Pedetes",
  "Perodicticus",
  "Petaurista",
  "Petaurus",
  "Phacochoerus",
  "Phascolarctos",
  "Philander",
  "Phoca",
  "Pithecia",
  "Pongo",
  "Potos",
  "Praomys",
  "Presbytis",
  "Procavia",
  "Procolobus",
  "Procyon",
  "Psammomys",
  "Pseudorca",
  "Pteromys",
  "Pteropus",
  "Pygathrix",
  "Rangifer",
  "Rattus",
  "Rhombomys",
  "Rousettus",
  "Saguinus",
  "Saimiri",
  "Sarcophilus",
  "Sciurus",
  "Selenarctos",
  "Setifer",
  "Spermophilus",
  "Spilogale",
  "Stenella",
  "Suricata",
  "Sus",
  "Sylvilagus",
  "Tamandua",
  "Tamias",
  "Tamiasciurus",
  "Tamiops",
  "Tapirus",
  "Tarsius",
  "Tayassu",
  "Tenrec",
  "Theropithecus",
  "Thryonomys",
  "Tragelaphus",
  "Trichosurus",
  "Trogopterus",
  "Tupaia",
  "Tursiops",
  "Urotrichus",
  "Varecia",
  "Viverra",
  "Vulpes",
  "Wallabia",
  "Zalophus",
];

const genusResponse = (url) => new Response(
  genuses[Math.floor(Math.random() * genuses.length)], {
  headers: {
    "Content-Type": "text/plain",
    ["x-source"]: url.host,
  },
});

const randomResponse = (size, url) => new Response(
  randomBytes(size), {
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="${size}.bin"`,
    ["x-source"]: url.host,
  },
});

const nullResponse = (url) => new Response(
  `Not Found: ${url.pathname}`, {
  status: 404,
  headers: {
    "Content-Type": "text/plain",
    ["x-source"]: url.host,
  },
});

const NullResponse = class extends Response {
  constructor(url){
    super(`Not Found: ${url.pathname}`, {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
        ["x-source"]: url.host,
      },
    });
  }
};

const errorResponse = ({message}, url) => new Response(
  `Internal Server Error: ${message}`, {
  status: 500,
  headers: {
    "Content-Type": "text/plain",
    ["x-source"]: url.host,
  },
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  try {
    const [,app, ...params] = url.pathname.split("/");
    switch (app) {
      case "genus":
        return genusResponse(url);
      case "bytes":
        return randomResponse(Math.min(Number(params[0]) || 1, MAX), url);
      default:
        // return nullResponse(url);
        return new NullResponse(url);
    }
  } catch (error) {
    return errorResponse(error, url);
  }
};
globalThis.addEventListener("fetch", ({respondWith}) => {
  respondWith(handleRequest(event.request));
});
