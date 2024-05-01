const express = require('express');
const router = express.Router();

router.post('/generatepackage', (req, res) => {
  const items = req.body;
  let filtereddata = items;
  let currentPackage = { items: [], totalWeight: 0, totalCost: 0, courierCost: 0 };
  const packages = generatepackage(items)
  res.json(packages);



  function generatepackage(items) {
    let totalCost = 0;
    let packages = [];

    items.forEach((element) => {
      totalCost += element.cost;
    });

    if (totalCost > 250) {
      items.sort((a, b) => (b.cost / b.weight) - (a.cost / a.weight));
    }

    items.forEach((item) => {
      // if (filtereddata.find((itemdata)=>itemdata.item===item.item)){
      if (currentPackage.totalCost + item.cost > 250) {
      //   let index=items.indexOf(item.item);
      //   const filteredarray = items.slice(index,-1)
      //   filteredarray.push(items.slice(-1));
      //   filteredarray.forEach((data) => {
      //     if (currentPackage.totalCost + data.cost <= 250) {
      //       insertItems(data)
      //       filtereddata = filteredarray.filter((data1) => data1.item !== data.item)
      //     }
      //   })

      currentPackage.courierCost = courierPrice(currentPackage.totalWeight)
      packages.push(currentPackage);
      currentPackage = { items: [], totalWeight: 0, totalCost: 0, courierCost: 0 };
      // if (filtereddata.find((itemdata)=>itemdata.item===item.item)){
      //   insertItems(item);
      // }
      insertItems(item)
    } else if (currentPackage.totalCost + item.cost < 250) {
      insertItems(item);
    }
  });

// Push the last package into the packages array
if (currentPackage.items.length > 0) {
  currentPackage.courierCost = courierPrice(currentPackage.totalWeight)
  packages.push(currentPackage);
}
return packages;
  }



function insertItems(item) {
  currentPackage.items.push(item.item);
  currentPackage.totalWeight += item.weight;
  currentPackage.totalCost += item.cost;
}


function courierPrice(weight) {
  if (weight > 0 && weight < 200) {
    return 5
  }
  else if (weight >= 200 && weight < 500) {
    return 10
  }
  else if (weight >= 500 && weight < 999) {
    return 15
  }
  else if (weight > 1000 && weight <= 5000) {
    return 20
  }
}
});



module.exports = router;