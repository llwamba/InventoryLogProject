import React, { Component } from "react";
import { variables } from "./Variables";

export class Item extends Component {

  //CONSTRUCTOR TO DEFINE STATE VARIABLES
  constructor (props) {
    super(props);

    this.state = {
      item: [], // ARRAY TO POPULATE ITEM'S DATA FROM API

      //MODAL POP-UP WINDOW WITH FORM FIELD TO ADD OR EDIT ITEM
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      modalTitle:"",
      ItemName:"",
      ItemId:0,

      // ItemIdFilter:"",
      // ItemNameFilter:"",
      // itemsWithoutFilter:[]
    }
  }

  // METHOD TO REFRESH ITEM DATA FROM THE API
  refreshList(){
    fetch(variables.API_URL+'item')
    .then(response=>response.json())
    //Once response is available, it is converted to json and assign to array
    .then(data=>{
        this.setState({item:data});
    });
  }
  // CALL THE REFRESH METHOD ONCE THE COMPONENT IS MOUNTED
  componentDidMount(){
    this.refreshList();
  }

  changeItemName = (e) => {
    this.setState({ItemName:e.target.value})
  }

  //SET MODAL TITLE TO ADD ITEM
  addClick(){
    this.setState({
        modalTitle:"Add Item",
        ItemId:0,
        ItemName:""
    });
  }

  editClick(ite){
    this.setState({
        modalTitle:"Edit Item",
        // ItemID and ItemName ARE BASED ON THE ROW DATA
        ItemId:ite.ItemId,
        ItemName:ite.ItemName
    });
  }

  //  METHOD TO CREATE NEW ITEM BY CONSUMING THE "POST" ITEM METHOD
  createClick(){
    fetch(variables.API_URL+'item',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ //PASS THE NEW ITEM NAME AS JSON IN THE METHOD BODY
            ItemName:this.state.ItemName
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

   //  METHOD TO UPDATE ITEM BY CONSUMING THE "PUT" API METHOD
   updateClick(){
    fetch(variables.API_URL+'item',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ //PASS THE ITEM NAME & ID AS JSON IN THE METHOD BODY
            ItemId:this.state.ItemId,
            ItemName:this.state.ItemName
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

  //  METHOD TO DELETE ITEM BY CONSUMING THE "DELETE" API METHOD
  deleteClick(id){
    if(window.confirm('Are you sure to delete this item?')){
      fetch(variables.API_URL+'item/'+ id,{
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
    // STATE VARIABLES FOR ITEM TO BE USED INSIDE HTML
    const { 
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      item,
      modalTitle,
      ItemId,
      ItemName,
    }=this.state;
  
  return (
    // HTML TO DISPLAY ITEM DATA USING BOOTSTRAP
    <div>  
      {/* BUTTON TO OPEN THE MODAL WINDOW TO ADD NEW ITEM */}
      <button type="button"
      className="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={()=>this.addClick()}>
        Add Item
      </button>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>
              Item Id
            </th>
            <th>
              Item Name
            </th>
            <th>
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {item.map(ite=>
            <tr key={ite.ItemId}>
              <td>{ite.ItemId}</td>
              <td>{ite.ItemName}</td>
              <td>
                <button type="button" className="btn btn-light mr-1" 
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"                
                onClick={()=>this.editClick(ite)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>

                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(ite.ItemId)}>
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
                <span className="input-group-text">Item Name</span>
                {/* TEXT BOX TO ADD OR EDIT ITEM NAME */}
                {/* WHEN THE VALUE OF THE TEXT BOX CHANGES WE WILL EXECUTE the changeItemName FUNCTION AND UPDATE THE VARIABLE SIMULTANEOUSLY */}
                <input type="text" className="form-control" 
                value={ItemName} 
                onChange={this.changeItemName}/>
              </div>

              {/* BUTTON TO CREATE NEW ITEM, AVAILABLE TO USER WANTS TO ADD ITEM */}
              {ItemId==0?
              <button type="button" className="btn btn-primary float-start" 
              onClick={()=>this.createClick()}>Create</button>
              :null}

              {/* BUTTON TO UPDATE ITEM, AVAILABLE TO USER WANTS TO UPDATE ITEM */}
              {ItemId!=0?
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









 