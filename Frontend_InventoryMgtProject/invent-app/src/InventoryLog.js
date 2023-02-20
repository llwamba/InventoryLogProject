import React, { Component } from "react";
import { variables } from "./Variables";

export class InventoryLog extends Component {

  //CONSTRUCTOR TO DEFINE STATE VARIABLES
  constructor (props) {
    super(props);

    this.state = {
      vendors: [], // ARRAY TO POPULATE VENDOR'S DATA FROM API
      item: [], // ARRAY TO POPULATE ITEM'S DATA FROM API
      inventorylog: [], // ARRAY TO POPULATE InventoryLog's DATA FROM API

      //MODAL POP-UP WINDOW WITH FORM FIELD TO ADD OR EDIT InventoryLog
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      modalTitle:"",
      InventoryId:0,
      ItemId:"",
      VendorId:"",
      Quantity:"",
      DateLog:"",
      CostItem:"",
      

      // ItemIdFilter:"",
      // ItemIdFilter:"",
      // itemsWithoutFilter:[]
    }
  }

  // METHOD TO REFRESH, inventorylog, ITEM, AND VENDOR DATA FROM THE API 
  refreshList(){

    fetch(variables.API_URL+'inventorylog')
    .then(response=>response.json())
    //Once response is available, it is converted to json and assign to array
    .then(data=>{
        this.setState({inventorylog:data});
    });

    fetch(variables.API_URL+'item')
    .then(response=>response.json())
    //Once response is available, it is converted to json and assign to array
    .then(data=>{
        this.setState({item:data});
    });

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

  changeItemId = (e) => {
    this.setState({ItemId:e.target.value})
  }

  changeVendorId = (e) => {
    this.setState({VendorId:e.target.value})
  }

  changeQuantity = (e) => {
    this.setState({Quantity:e.target.value})
  }
  

  changeDateLog =(e)=>{
    this.setState({DateLog:e.target.value});
  }

  changeCostItem = (e) => {
    this.setState({CostItem:e.target.value})
  }


  //SET MODAL TITLE TO ADD INVENTORY LOG
  addClick(){
    this.setState({
        modalTitle:"Log Inventory Data",
        InventoryId:0,
        ItemId:"",
        VendorId:"",
        Quantity:"",
        DateLog:"",
        CostItem:"",
    });
  }

  editClick(invlog){
    this.setState({
        modalTitle:"Edit Inventory Log",
        // ItemID and ItemId ARE BASED ON THE ROW DATA
        InventoryId:invlog.InventoryId,
        ItemId: invlog.ItemId,
        VendorId: invlog.VendorId,
        Quantity:"",
        DateLog:"",
        CostItem:"",
    });
  }

  //  METHOD TO CREATE NEW INVENTORY LOG BY CONSUMING THE "POST" INVENTORY LOG METHOD
  createClick(){
    fetch(variables.API_URL+'inventorylog',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ 
          ItemId: this.state.ItemId,
          VendorId: this.state.VendorId,
          Quantity: this.state.Quantity,
          DateLog: this.state.DateLog,
          CostItem: this.state.CostItem,
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

   //  METHOD TO UPDATE INVENTORY LOG BY CONSUMING THE "PUT" API METHOD
   updateClick(){
    fetch(variables.API_URL+'inventorylog',{
        method:'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({  
          ItemId: this.state.ItemId,
          VendorId: this.state.VendorId,
          Quantity: this.state.Quantity,
          DateLog: this.state.DateLog,
          CostItem: this.state.CostItem,
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

  //  METHOD TO DELETE INVENTORY LOG BY CONSUMING THE "DELETE" API METHOD
  deleteClick(id){
    if(window.confirm('Are you sure to delete this log data?')){
      fetch(variables.API_URL+'inventorylog/'+ id,{
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
    // STATE VARIABLES FOR INVENTORY LOG TO BE USED INSIDE HTML
    const { 
      //VARIABLES TO BE USED IN THE MODAL WINDOW
      vendors,
      item,
      inventorylog,
      modalTitle,
      InventoryId,
      ItemId,
      VendorId,
      Quantity,
      DateLog,
      CostItem,
    }=this.state;
  
  return (
    // HTML TO DISPLAY INVENTORY LOG DATA USING BOOTSTRAP
    <div>  
      {/* BUTTON TO OPEN THE MODAL WINDOW TO ADD NEW INVENTORY LOG */}
      <button type="button"
      className="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={()=>this.addClick()}>
        Log Inventory
      </button>

      <table className="table table-striped">

        <thead>
          <tr>
            <th>
              Inventory Id
            </th>
            <th>
              Item Id
            </th>
            <th>
              Vendor Id
            </th>
            <th>
              Quantity
            </th>
            <th>
              Date
            </th>
            <th>
              Item Cost
            </th>
            <th>
              Options
            </th>
          </tr>
        </thead>

        <tbody>  
          {inventorylog.map(invlog=>
            <tr key={invlog.InventoryId}>
              <td>{invlog.InventoryId}</td>
              <td>{invlog.ItemId}</td>
              <td>{invlog.VendorId}</td>
              <td>{invlog.Quantity}</td>
              <td>{invlog.DateLog}</td>
              <td>{invlog.CostItem}</td>
              <td>
                <button type="button" className="btn btn-light mr-1" 
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"                
                onClick={()=>this.editClick(invlog)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>

                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(invlog.InventoryId)}>
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
              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 w-50 bd-highlight">

                  {/* ITEM NAME INPUT */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">Item Name</span>
                    <select className="form-select"
                    onChange={this.changeItemId}
                    value={ItemId}> 
                        {item.map(ite=><option key={ite.ItemId}>
                            {ite.ItemId}
                        </option>)}
                    </select>
                  </div>
                  
                {/* VENDOR NAME INPUT */}
                <div className="input-group mb-3">
                  <span className="input-group-text">Vendor Name</span>
                  <select className="form-select"
                  onChange={this.changeVendorId}
                  value={VendorId}> 
                      {vendors.map(vend=><option key={vend.VendorId}>
                          {vend.VendorId}
                      </option>)}
                  </select>
                </div>
                
                {/* QUANTITY INPUT */}
                <div className="input-group mb-3">
                  <span className="input-group-text">Quantity</span>
                  <input type="number" className="form-control"
                  value={Quantity}
                  onChange={this.changeQuantity} required/>
                </div>

                {/* LOG DATE-TIME INPUT */}
                <div className="input-group mb-3">
                  <span className="input-group-text">Date</span>
                  <input type="datetime-local" className="form-control"
                  value={DateLog}
                  onChange={this.changeDateLog} required/>
                </div>
                
                {/* ITEM COST INPUT */}
                <div className="input-group mb-3">
                  <span className="input-group-text">Item Cost</span>
                  <input type="number" step="any" className="form-control"
                  value={CostItem}
                  onChange={this.changeCostItem} required/>
                </div>
              </div>



            </div>

            {/* BUTTON TO CREATE NEW ITEM, AVAILABLE TO USER WANTS TO ADD ITEM */}
            {InventoryId==0?
              <button type="button" className="btn btn-primary float-start" 
              onClick={()=>this.createClick()}>Log</button>
              :null}

              {/* BUTTON TO UPDATE ITEM, AVAILABLE TO USER WANTS TO UPDATE ITEM */}
              {InventoryId!=0?
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









 

 