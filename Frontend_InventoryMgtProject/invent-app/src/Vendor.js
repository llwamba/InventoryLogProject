import React, { Component } from "react";
import { variables } from "./Variables";

export class Vendor extends Component {

  //CONSTRUCTOR TO DEFINE STATE VARIABLES
  constructor (props) {
    super(props);

    this.state = {
      vendors: [], // ARRAY TO POPULATE VENDOR'S DATA FROM API

      //MODAL POP-UP WINDOW WITH FORM FIELD TO ADD OR EDIT VENDORS
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      modalTitle:"",
      VendorName:"",
      VendorId:0,

      // VendorIdFilter:"",
      // VendorNameFilter:"",
      // vendorsWithoutFilter:[]
    }
  }

  // METHOD TO REFRESH VENDORS DATA FROM THE API
  refreshList(){
    fetch(variables.API_URL+'vendors')
    .then(response=>response.json())
    //Once response is available, it is converted to json and assign to array
    .then(data=>{
        this.setState({vendors:data});
    });
  }
  // CALL THE REFRESH METHOD ONCE THE COMPONENT IS MOUNTED
  componentDidMount(){
    this.refreshList();
  }

  changeVendorName = (e) => {
    this.setState({VendorName:e.target.value})
  }

  //SET MODAL TITLE TO ADD VENDOR
  addClick(){
    this.setState({
        modalTitle:"Add Vendor",
        VendorId:0,
        VendorName:""
    });
  }

  editClick(vend){
    this.setState({
        modalTitle:"Edit Vendor",
        // VendorID and VendorName ARE BASED ON THE ROW DATA
        VendorId:vend.VendorId,
        VendorName:vend.VendorName
    });
  }

  //  METHOD TO CREATE NEW VENDOR BY CONSUMING THE "POST" VENDOR METHOD
  createClick(){
    fetch(variables.API_URL+'vendors',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ //PASS THE NEW VENDOR NAME AS JSON IN THE METHOD BODY
            VendorName:this.state.VendorName
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
  }

   //  METHOD TO UPDATE VENDOR BY CONSUMING THE "PUT" API METHOD
   updateClick(){
    fetch(variables.API_URL+'vendors',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ //PASS THE VENDOR NAME & ID AS JSON IN THE METHOD BODY
            VendorId:this.state.VendorId,
            VendorName:this.state.VendorName
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);
        this.refreshList();
    },(error)=>{
        alert('Failed');
    })
  }

  //  METHOD TO DELETE VENDOR BY CONSUMING THE "DELETE" API METHOD
  deleteClick(id){
    if(window.confirm('Are you sure to delete this vendor?')){
      fetch(variables.API_URL+'vendors/'+ id,{
          method:'DELETE',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          }
      })
      .then(res=>res.json())
      .then((result)=>{
          alert(result);
          this.refreshList();
      },(error)=>{
          alert('Failed');
      })
    }
  }
  
  render() {
    // STATE VARIABLES FOR VENDORS TO BE USED INSIDE HTML
    const { 
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      vendors,
      modalTitle,
      VendorId,
      VendorName
    }=this.state;
  
  return (
    // HTML TO DISPLAY VENDORS DATA USING BOOTSTRAP
    <div>  
      {/* BUTTON TO OPEN THE MODAL WINDOW TO ADD NEW VENDOR */}
      <button type="button"
      className="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={()=>this.addClick()}>
        Add Vendor
      </button>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>
              Vendor Id
            </th>
            <th>
              Vendor Name
            </th>
            <th>
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {vendors.map(vend=>
            <tr key={vend.VendorId}>
              <td>{vend.VendorId}</td>
              <td>{vend.VendorName}</td>
              <td>
                <button type="button" className="btn btn-light mr-1" 
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"                
                onClick={()=>this.editClick(vend)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>

                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(vend.VendorId)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
              </td>

            </tr>                  
            )}
        </tbody>

      </table>

      {/* HTML CODE FOR BOOTSTRAP MODAL     */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">

        <div className="modal-dialog modal-lg modal-dialog-centered">

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Vendor Name</span>
                {/* TEXT BOX TO ADD OR EDIT VENDOR NAME */}
                {/* WHEN THE VALUE OF THE TEXT BOX CHANGES WE WILL EXECUTE the changeVendorName FUNCTION AND UPDATE THE VARIABLE SIMULTANEOUSLY */}
                <input type="text" className="form-control" 
                value={VendorName} 
                onChange={this.changeVendorName}/>
              </div>

              {/* BUTTON TO CREATE NEW VENDOR, AVAILABLE TO USER WANTS TO ADD VENDOR */}
              {VendorId==0?
              <button type="button" className="btn btn-primary float-start" 
              onClick={()=>this.createClick()}>Create</button>
              :null}

              {/* BUTTON TO UPDATE VENDOR, AVAILABLE TO USER WANTS TO UPDATE VENDOR */}
              {VendorId!=0?
              <button type="button" className="btn btn-primary float-start" 
              onClick={()=>this.updateClick()}>Update</button>
              :null}

            </div>


          </div>

        </div>



      </div> 





    </div>
  )
  }
  }




