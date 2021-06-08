import React from "react";

const PersonDetails = (props)=>{
    
    console.log("props person inCity",props.person.inCity)
      let countryName = 'No Country';
      if(props.person.inCity != null){
          
          if(props.person.inCity.Country != null){
              countryName = props.person.inCityId.inCity.Country.countryName.map((c) =>{
                  return (
                      <p key={c.id}>{c.countryName}</p>
                  );
              })
          }
      }
      

      let languageNames = 'No Language';
      if(props.person.personLanguages !=null){

          if(props.person.personLanguages.length > 0){
             languageNames = props.person.personLanguages.map((pl)=>{
                return (
                    <p key={pl.LanguageId}>{pl.language.name}</p>
                );
              });
    
          }
      }



    return (
        <div className="col-md-6">
            <ul className="list-group">
                <li className="list-group-item">
                    <b>Name:</b>
                    <p>{props.person.name}</p>
                </li>
                <li className="list-group-item">
                    <b>Phone</b>
                    <p>{props.person.phone}</p>
                </li>
                <li className="list-group-item">
                    <b>City</b>
                    <p>{props.person.inCity == null? 'No City': props.person.inCity.cityName/* null check */}</p> 
                </li>
                <li className="list-group-item">
                    <b>Country</b>
                    <p>{countryName}</p>
                </li>
                <li className="list-group-item">
                    <b>Language</b>
                    {languageNames}
                </li>

                <li className="list-group-item">
                    <b>Action</b>
                    <button className="btn btn-secondary" onClick={props.closeDetails}>Close</button>
                    <button className="btn btn-danger" onClick={()=> props.deletePerson(props.person.id)}>Delete</button>
                </li>
            </ul>
        </div>
    );
};

export default PersonDetails;