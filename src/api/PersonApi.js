import axios from "axios";



const ApiAdress= "https://localhost:44310/api/"

export default function getPeople() {
    return fetch("https://localhost:44310/api/Api" )
        .then(data => data.json());
}

export async function getCities() {
    console.log("api getCities");
    return fetch( ApiAdress + "Cities/").then((data) => data.json());
  }
  
  export async function getCountries() {
    console.log("api getCountries");
    return fetch(ApiAdress + "Countries/").then((data) => data.json());
  }

export async function getPeopleById(id) {
    try{

         let response = await fetch(ApiAdress +"Api/" + id);
    
        let json = await response.json();

        return json;
    }
    catch (e){
        console.log("Error", e);
    }
        
}

export async function createPerson(person){
    try{

        let response = await axios.post('https://localhost:44310/api/Api/',{
            Name : person.Name,  
            Phone: person.Phone,
            CityId: person.inCityId,
            CountryId: person.countryName
            
        });
        console.log("Create person",response);
   
       let json = await response.data;

       return json;
   }
   catch (e){

       console.log("Error", e);
   }
}



export async function deletePerson(id){
    try {
        let response = await axios.delete('https://localhost:44310/api/Api/' + id);
        console.log (response);

        return true;
    }
    catch(e){
        console.log('Error!', e);
        return false;
    }
}



