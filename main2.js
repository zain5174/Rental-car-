let carsList = document.querySelector(".cards-wrapper")
let btn = document.querySelector(".btn")
let RecomcarsList = document.querySelector(".recommended-cards-wrapper")
let data = []
const getData = async () => {
  try {
    const res = await fetch('cars.json')
    data = await res.json()
  
data.forEach((item) =>{
  carsList.innerHTML += `<div class="card p-[20px] bg-[white] w-[100%] rounded-lg">
          <div class="card-title flex items-center justify-between">
            <h2>${item.cartitle}</h2>
            <i class="fa-solid fa-heart text-[20px]" style="color: gray"></i>
            
          </div>
          <div class="card-model">
            <h4 class="l-gray">${item.carmodel}</h4>
          </div>
          
          <div class="car-img">
            <img src="${item.carimg}" alt="" />
          </div>
          <div class="car-details flex l-gray items-center ">
            <div class="car-detail-icon flex items-center">
              <i class="fa-solid fa-gas-pump" )></i>
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
            <button class="btn"><h4>Rental Now</h4></button>
          </div>
        </div>
        </div>`
})
  
  
  } catch (e) {
console.log(e)
  }
}
getData()
console.log()