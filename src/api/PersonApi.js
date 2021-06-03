import axios from "axios";





export default function getPeople() {
    return fetch('https://localhost:44310/api/Api/')
        .then(data => data.json());
}


export async function getPeopleById(id) {
    try{

         let response = await fetch('https://localhost:44310/api/Api/' + id);
    
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
            Name : person.Namem,
            Phone: person.Phone,
            City: person.City,
            Country: person.Country,
            Language: person.Language
        });
        console.log(response);
   
       let json = await response.data();

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



