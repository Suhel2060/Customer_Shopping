
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Items from './components/Items';
import Orderitems from './components/Orderitems';

const App=()=> {
  const [items,setitems]=useState([]);
  const [orderitems,setorderitems]=useState([]);
  const [processedOrderItems,setProcessedOrderItems]=useState([]);
  const [showOrderItems,setShowOrderItems]=useState(false)
  let packageNo=0;

  const fetchitems=async () =>{
    let response=await fetch('http://localhost:5000/items/fetchitem',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    let data=await response.json();
    setitems(data);
    
  }

  const setpackage=async()=>{
    const response=await fetch('http://localhost:5000/package/generatepackage',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body:JSON.stringify(orderitems.item,orderitems.cost,orderitems.item_weight);
      body:JSON.stringify(orderitems),

    })
    let data=await response.json();
    console.log(data)
    setProcessedOrderItems(data);
    setorderitems([])
    setShowOrderItems(true)
  // document.querySelectorAll('.Check').forEach((check)=>check.checked=false)

  }

  
  useEffect(() => {
    fetchitems();
  }, [])


  return (
   <>
   <Navbar/>
   <div className="container my-5">
    <ul className="list-group">
   {items.map((items)=><Items items={items} key={items.item} setorderitems={setorderitems} orderitems={orderitems}/>)}
   </ul>
   <button type="button" className="btn btn-primary my-3" onClick={setpackage}>Place Order</button>
    </div>

    <div className="container">
      {showOrderItems && processedOrderItems.map((orderitem,index)=>  <Orderitems orderitem={orderitem} key={index} packageNo={packageNo+=1}/>)}

    </div>
   </>
  );
}

export default App;
