import React, {Component} from "react";
import Header from "./Header";
import Footer from  "./Footer";

import PersonTable from "./PersonTable";
import PersonDetails from "./PersonDetail";
import getPeople, {deletePerson, getPeopleById, createPerson } from "../api/PersonApi";
import PersonCreate from "./PersonCreate";






class App extends Component {
    state = {
      detailsPerson: null,
      createPerson: false,
      personList: []
    };
    componentDidMount() {
        const _this = this;
        getPeople().then((people) => {
          _this.setState({ personList: people });
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
        if (person != null ){
          if (deletePerson(id)){
            const persons= this.state.personList;
            persons.forEach((element) => {
              if(element.id ===id){

                persons.pop(element);
              }
            });
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
        console.log(person);

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


     

  

render() {
  const sideElement =
  this.state.detailsPerson != null ?(
    <PersonDetails
    person={this.state.detailsPerson}
    closeDetails={this.closeDetails}
    deletePerson={this.deletePerson}
    />
  ) : this.state.createPerson ?(
    <PersonCreate addPerson ={this.addPerson} closeCreate={this.closeCreate}/>
  ) : (
    <div className="col-md-6">
      <button onClick={this.showCreatePerson} className="btn btn-success">
        Add Person
      </button>
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


