import React, {Component} from "react";
import Header from "./Header";
import Footer from  "./Footer";

import PersonTable from "./PersonTable";
import PersonDetails from "./PersonDetail";
import getPeople, {deletePerson, getPeopleById, createPerson ,getCities , getCountries} from "../api/PersonApi";
import PersonCreate from "./PersonCreate";






class App extends Component {
    state = {
      detailsPerson: null,
      createPerson: false,
      personList: [],
      cityList: [],
      countryList: []
    };
    componentDidMount() {
        const _this = this;
        getPeople().then((people) => {
          _this.setState({ personList: people });
        });

        getCities().then((cities) => {
          _this.setState({ cityList: cities });
        });

        getCountries().then((countries) =>{
          _this.setState({countryList: countries})
        });


      }
     findPerson = async(id) =>{
        return await getPeopleById(id);

      }

      showPerson = async (id) =>{
        const person =await this.findPerson(id);
        console.log("person",person)
        if(person !=null) {
          this.setState({
            detailsPerson: person,
          });
        }
      };

      closeDetails= () =>{
        this.setState({
          detailsPerson: null,
        });
      };

      DeletePersonHandler =(id) =>{
        const person = this.findPerson(id);
        console.log('deleteid', id)
        if (person != null ){
          if (deletePerson(id)){
            const persons= this.state.personList;

            for (let index =0; index < persons.length; index++){
              if( persons[index].id ===id){
                persons.splice(index,1)
              }
            }
           
            this.setState({
              personList: persons,
              detailsPerson: null,
            });
          }
        }
      };

      showCreatePerson =() =>{
        this.setState({
          createPerson:true,
        });
      };

      addPerson = async (person) =>{
        const personList = this.state.personList;

        person = await createPerson(person);

        console.log('Add person',person);

        if(person !== undefined){
          personList.push(person);
        }

        this.setState({
          personList: personList,
          createPerson: false,
        });
      };

      closeCreate =() =>{
        this.setState({
          createPerson:false,
        });
      };

      sortPersonTable =() =>{
        const sortList = this.state.personList;

        sortList.sort((a, b) => (a.name > b.name ? 1 : -1));
       

        this.setState({
          personList: sortList,
        });
      };


     

  

render() {
  const sideElement =
  this.state.detailsPerson != null ?(
    <PersonDetails
    person={this.state.detailsPerson}
    closeDetails={this.closeDetails}
    deletePerson={this.DeletePersonHandler}
    />
  ) : this.state.createPerson ?(
    <PersonCreate addPerson ={this.addPerson} closeCreate={this.closeCreate} citiesArray={this.state.cityList} countryArray={this.state.countryList}/>
  ) : (
    <div className="col-md-6">
      <button onClick={this.showCreatePerson} className="btn btn-success">
        Add Person
      </button>

      <button onClick={this.sortPersonTable} className="btn btn-secondary">Sort</button>
      
      <p>Click on Details to see more info</p>
    </div>

  );

    return (
      <React.Fragment>
        <Header />
        <div className="container stay-clear">
          <h3>People SPA</h3>
          <hr />
          <div className="row">
            
            <PersonTable persons ={this.state.personList} showPerson={this.showPerson} />
            {sideElement} 
          </div>
        </div>
        
        <Footer />
      </React.Fragment>
    );
  }
}
export default App;


