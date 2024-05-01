const express = require('express');
const router = express.Router();

router.post('/generatepackage', (req, res) => {
  //get the data from th body 
  try {
    const items = req.body;
    //calling the generatePackage Function
    const packages = generatepackage(items)
    res.json(packages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }



  function generatepackage(items) {
    let packages = [];
    let currentPackage = { items: [], totalWeight: 0, totalCost: 0, courierCost: 0 };
    items.sort((a, b) => (b.cost / b.weight) - (a.cost / a.weight));
    items.forEach((item) => {
      // checking whether the totalcost exceed 250 or not
      if (currentPackage.totalCost + item.cost > 250) {
        currentPackage.courierCost = courierPrice(currentPackage.totalWeight)
        packages.push(currentPackage);
        currentPackage = { items: [], totalWeight: 0, totalCost: 0, courierCost: 0 };
        insertItems(currentPackage, item)
      } else if (currentPackage.totalCost + item.cost < 250) {
        insertItems(currentPackage, item);
      }
    });

    // Push the last package into the packages array
    if (currentPackage.items.length > 0) {
      currentPackage.courierCost = courierPrice(currentPackage.totalWeight)
      packages.push(currentPackage);
    }
    return packages;
  }


//adding data to the current package
  function insertItems(currentPackage, item) {
    currentPackage.items.push(item.item);
    currentPackage.totalWeight += item.weight;
    currentPackage.totalCost += item.cost;
  }

  // getting the courier orice for packages
  function courierPrice(weight) {
    if (weight > 0 && weight < 200) {
      return 5
    }
    else if (weight >= 200 && weight < 500) {
      return 10
    }
    else if (weight >= 500 && weight < 1000) {
      return 15
    }
    else if (weight > 1000 && weight <= 5000) {
      return 20
    }
  }
});



module.exports = router;