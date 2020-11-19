import { DigimonI } from "../interfaces/DigimonInterfaces";
import { getNewDigimon } from './../controllers/DigimonsController';
const db = require('../db/Digimons.json');

module DigimonsService { 
    export function getAll(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        return digimons
    }
    export function get(id: number): DigimonI {
        const digimons: Array<DigimonI> = db;
        const digimon: Array<DigimonI> = digimons.filter(e => e.id === id);
        if (digimon.length < 1) {
            throw "No se encontró el digimon"
        }
        return digimon[0];
    }
    export function getByName(name: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        const matches: Array<DigimonI> = digimons.filter(function(el) {
            return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })
        if (matches.length < 1) {
            throw "No se encontró el digimon"
        }
        return matches;
    }
    
    export function getByType(type: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matches: Array<DigimonI> = [];
        digimons.forEach(digimon => {
            const found = digimon.type.filter(e => e.name === type);
            if (found.length>0) {
                matches.push(digimon);
            }
        })
         
        if (matches.length < 1) {
            throw "No se encontró el tipo"
        }
        return matches;
    }

    export function getAgainst(name: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matchesStrong: Array<DigimonI> = [];
        let matchesWeak: Array<DigimonI> = [];
        let digimon: Array<DigimonI> = digimons.filter(function (el) {
            return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        })

        if (digimons.length < 1) {
            throw "No se encontró el Digimon"
        } else {
            digimon = digimons.filter(function(el) {
                const nombre = el.name;                
                const status = el.type.filter(e =>{
                    let tipo = e.name;         
                    digimons.forEach(digimon => {
                        const comparation = digimon.type.filter(z =>{
                            for (let i = 0; i < z.weakAgainst.length; i++) {
                                const element = z.weakAgainst[i];
                                if (element.toString() == tipo){
                                    matchesStrong.push(digimon);
                                }
                            }
                            for (let j = 0; j < z.strongAgainst.length; j++) {
                                const element2 = z.strongAgainst[j];
                                console.log("Compare");
                                console.log(element2);
                                console.log(tipo);
                                if ( element2.toString() == tipo){
                                    console.log("Entre en if")
                                    matchesWeak.push(digimon);
                                }
                            }
                        })
                        
                    })
                    console.log(matchesStrong);
                    console.log(matchesWeak);
                    matchesStrong.filter(name =>{
                       const nombreFuerte  = name.name;
                       matchesWeak.filter(name =>{
                           
                        const nombreDebil = name.name;
                        throw "Nombre: " + nombre + " tipo: "+ e.name + " es fuerte contra: " + nombreFuerte + " pero es débil contra: " + nombreDebil;
                       })
                       
                    })
                    

                }) 
            });
            console.log(matchesStrong);
            console.log(matchesWeak);
            return digimon;
        }

    }


    export function getNewDigimon(name: string): Array<DigimonI> {
        var splitted = name.split(",");
        throw "Nombre: "+splitted[0]+ " tipo: " +splitted[1]+ " es fuerte contra " +splitted[2]+ " es debil contra " +splitted[3]+ " img " + splitted[4];
    
    }



}

export default DigimonsService;
