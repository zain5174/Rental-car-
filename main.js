let popularList = document.querySelector(".cards-wrapper")
let viewAll = document.querySelector(".view-all-cars")
let viewAll2 = document.querySelector(".view-all-cars2")
let heartIconCount = document.querySelector(".nav-heart-count")
let RecomcarsList = document.querySelector(".recommended-cards-wrapper")

let popularCars = []
let recommendedCars = []
let rentelNow = []

let allCars = []   // ✅ new combined array

let itemcount = 4
let itemcount2 = 6


// localStorage se favorite cars
let fevCars = JSON.parse(localStorage.getItem("favorite")) || []
heartIconCount.innerText = fevCars.length



const getData = async () => {

  try {

    const res = await fetch("cars.json")
    let data = await res.json()

    popularCars = data.filter(car => car.category === "popular")
    recommendedCars = data.filter(car => car.category === "recommended")

    // ❌ old
    // [...popularCars, ...recommendedCars]

    // ✅ spread operator
    allCars = [...popularCars, ...recommendedCars]

    showitems()
    recomshowitems()

  } catch (e) {

    console.log(e)

  }

}



// ---------------- POPULAR CARS ----------------

const showitems = () => {

  popularList.innerHTML = ""

  popularCars.slice(0, itemcount).forEach((item) => {

    let exist = fevCars.find(car => car.id == item.id)

    let color = exist ? "red" : "gray"

    popularList.innerHTML += `

    <div class="card p-[20px] bg-[white] w-[100%] rounded-lg">

      <div class="card-title flex items-center justify-between">

        <h2>${item.cartitle}</h2>

        <i class="heart-icon fa-solid fa-heart text-[20px]"
        style="color:${color}"
        data-id="${item.id}"></i>

      </div>


      <div class="card-model">

        <h4 class="l-gray">${item.carmodel}</h4>

      </div>


      <div class="car-img">

        <img src="${item.carimg}" alt="">

      </div>


      <div class="car-details flex l-gray items-center">


        <div class="car-detail-icon flex items-center">

          <i class="fa-solid fa-gas-pump"></i>
          <p>${item.carfuel}</p>

        </div>


        <div class="car-detail-icon flex items-center">

          <i class="fa-brands fa-gg-circle"></i>
          <p>${item.cartype}</p>

        </div>


        <div class="car-detail-icon flex items-center">

          <i class="fa-solid fa-people-pulling"></i>
          <p>${item.carspace}</p>

        </div>


      </div>


      <div class="car-price flex justify-between">

        <h2>${item.carprice}$/<span class="l-gray">day</span></h2>

        <a class="btn rentel-now" data-id="${item.id}">Rental Now</a>

      </div>

    </div>

    `
  })

}



// ---------------- RECOMMENDED CARS ----------------

const recomshowitems = () => {

  RecomcarsList.innerHTML = ""

  recommendedCars.slice(0, itemcount2).forEach((item) => {

    let exist = fevCars.find(car => car.id == item.id)

    let color = exist ? "red" : "gray"

    RecomcarsList.innerHTML += `

    <div class="card p-[20px] bg-[white] w-[100%] rounded-lg">

      <div class="card-title flex items-center justify-between">

        <h2>${item.cartitle}</h2>

        <i class="heart-icon fa-solid fa-heart text-[20px]"
        style="color:${color}"
        data-id="${item.id}"></i>

      </div>


      <div class="card-model">

        <h4 class="l-gray">${item.carmodel}</h4>

      </div>


      <div class="car-img">

        <img src="${item.carimg}" alt="">

      </div>


      <div class="car-details flex l-gray items-center">


        <div class="car-detail-icon flex items-center">

          <i class="fa-solid fa-gas-pump"></i>
          <p>${item.carfuel}</p>

        </div>


        <div class="car-detail-icon flex items-center">

          <i class="fa-brands fa-gg-circle"></i>
          <p>${item.cartype}</p>

        </div>


        <div class="car-detail-icon flex items-center">

          <i class="fa-solid fa-people-pulling"></i>
          <p>${item.carspace}</p>

        </div>


      </div>


      <div class="car-price flex justify-between">

        <h2>${item.carprice}$/<span class="l-gray">day</span></h2>

        <a class="btn rentel-now" data-id="${item.id}">Rental Now</a>

      </div>

    </div>

    `
  })

}



// ---------------- VIEW ALL ----------------

viewAll.addEventListener("click", () => {

  itemcount = popularCars.length
  showitems()

  viewAll.style.display = "none"

})


viewAll2.addEventListener("click", () => {

  itemcount2 = recommendedCars.length
  recomshowitems()

  viewAll2.style.display = "none"

})



// ---------------- FAVORITE FUNCTION ----------------

function toggleFavorite(id, icon) {

  let existIndex = fevCars.findIndex(item => item.id == id)

  if (existIndex === -1) {

    // ❌ old
    // let car = [...popularCars,...recommendedCars].find(item => item.id == id)

    // ✅ new clean method
    let car = allCars.find(item => item.id == id)

    // ❌ old
    // fevCars.push(car)

    // ✅ spread operator
    fevCars = [...fevCars, ]

    icon.style.color = "red"

  }

  else {

    fevCars.splice(existIndex,1)

    icon.style.color = "gray"

  }

  localStorage.setItem("favorite", JSON.stringify(fevCars))

  heartIconCount.innerText = fevCars.length

}



// ---------------- EVENT DELEGATION ----------------

popularList.addEventListener("click",(e)=>{

  if(e.target.classList.contains("heart-icon")){

    let id = e.target.dataset.id

    toggleFavorite(id,e.target)

  }


  if(e.target.classList.contains("rentel-now")){

    let id = e.target.dataset.id

    let car = popularCars.find(item => item.id == id)

    // ❌ old
    // rentelNow.push(car)

    // ✅ spread operator
    rentelNow = [...rentelNow,car]

    console.log("rented",rentelNow)

  }

})



RecomcarsList.addEventListener("click",(e)=>{

  if(e.target.classList.contains("heart-icon")){

    let id = e.target.dataset.id

    toggleFavorite(id,e.target)

  }


  if(e.target.classList.contains("rentel-now")){

    let id = e.target.dataset.id

    let car = recommendedCars.find(item => item.id == id)

    // ❌ old
    // rentelNow.push(car)

    // ✅ spread operator
    rentelNow = [...rentelNow,car]

    console.log("rented",rentelNow)

  }

})



getData()

console.log("favorite cars",fevCars)