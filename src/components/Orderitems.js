import React from 'react'

const Orderitems = (props) => {
    const {orderitem,packageNo}=props;
  return (
   <>
   <div class="card my-4" style={{width:"20rem"}}>
  <div class="card-body">
    <p class="card-text" style={{wordBreak:"break-all"}}>Product {packageNo}</p>
    <p class="card-text">Items - {orderitem.items.slice(0, -1).join(', ')}
  {orderitem.items.length > 1 && ', '}
  {orderitem.items.slice(-1)}</p>
    <p class="card-text">Total Weight - {orderitem.totalWeight}g</p>
    <p class="card-text">Total Cost - ${orderitem.totalCost}</p>
    <p class="card-text">Courier Cost - ${orderitem.courierCost}</p>


  </div>
</div>
   </>
  )
}

export default Orderitems
