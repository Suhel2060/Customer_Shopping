import React from 'react'

const Items = (props) => {

    // destructuring to get items,setorderitems,orderitems,orderitems from props
    const {items,setorderitems,orderitems}=props;

    //function to handle the onchange in checkbox
    const handlechange=(e)=>{
        //checking whether the check box is checked or not
        if(e.target.checked){
            //if checked we keep the previous value and insert the new value using spread operator
            setorderitems([...orderitems,{item:items.item,cost:parseInt(items.cost),weight:parseInt(items.item_weight)}])
        }else{
            // if unchecked using filter to the orderitems to get the data without the unchecked data and store in the setorderitems
            let array=orderitems.filter(orderitems=>orderitems.name!==items.name);
            setorderitems(array)
  
        }

    }

    
  return (


<li className="list-group-item d-flex flex-row align-items-center justify-content-around" aria-current="true">
        <span>{items.item}</span>
        <span>Price: {items.cost}</span>
        <span>Weight: {items.item_weight}</span>
         <input type="checkbox" className='Check' 
           value={items.item} onChange={handlechange}/>
         </li>
       
  )
}

export default Items
