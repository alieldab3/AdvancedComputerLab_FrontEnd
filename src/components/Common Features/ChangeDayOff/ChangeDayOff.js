import locale from 'antd/lib/date-picker/locale/en_US';
import React , { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom'
import './ChangeDayOff.css';
import axios from 'axios';

 class ChangeDayOff extends Component {
     state = {
         OldDay_Off:"",
         comment:"",
         message:""
     }

     componentDidMount() {
        axios.get('http://localhost:5000/viewProfile')
          .then(res => {
            const dayOff = res.data[0].dayoff;
            this.setState({ OldDay_Off:dayOff });
          });
      }
      HandleSubmit(){
        let newDay = document.getElementById("NewDayOff").value;
        let comment = document.getElementById("SenderComment").value;
        if(newDay.localeCompare(this.state.OldDay_Off))
            this.state.message = "This is Already Your Dayoff"
        else{
            axios.post('http://localhost:5000/Academics/ChangeDayoffRequest',{
                day:newDay,
			    senderComment:comment
            },{withCredentials:true})
            .then((response)=>{
                this.setState({message : "Request Sent Sucessfully"})
            })
            .catch((error)=>{
                this.setState({message : "Request failed"})
                console.log(error);
            });
          
        }
      }

   render () {
     return (
        <div class="main">
        <div class="cardupdate">
        <p>
          Enter the new day-off, and then submit to send your Request.
        <br></br>
        <br></br>
        After submission, A new Request will be sent to The Head of Department.
        <br></br>
        You'll be notified when your Request is rejected / Accepted<br></br><br></br>
        Your current Day off : {this.state.OldDay_Off}
        </p>
        <br></br>
        
        <select class="form-select" id="NewDayOff" aria-label="Default select example">
        <option selected>Select New DayOff</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        </select><br></br>

        <button type="button" class="btn btn-primary" onClick={() => this.HandleSubmit()}>Submit</button>

        </div>   
        </div>
          );
   }
 }


export default ChangeDayOff;