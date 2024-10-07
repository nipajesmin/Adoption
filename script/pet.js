
//for Cat dog rabbit bird button
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then((res) => res.json())
  .then((data) => displayCategories(data.categories))
  .catch((error) => console.log(error));

};


//for Cat dog rabbit bird button
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  // Use flexbox for mobile and grid for larger screens
  categoryContainer.classList = "flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-5"; 

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = 
    `
    <button id="btn-'${item.category}'" onclick="handleSearch(),loadCategoryitem('${item.category}')"
      class="btn category-btn flex flex-col items-center">
      <img src="${item.category_icon}" alt="${item.category}" class="w-10 h-10 mb-2"/>
      ${item.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};


const removeActiveClass=() => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const loadCategoryitem = (idd) => {
   //alert(idd);
   //console.log(idd);
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${idd}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
    const activeBtn = document.getElementById(`btn-'${idd}'`);
    activeBtn.classList.add("active");
   // console.log(activeBtn);
    //console.log(data.data[0].category);
    displayAll(data.data);
     })
     .catch((error) => console.log(error));
};

const loadAllCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
  .then((res) => res.json())
  .then((data) => displayAll(data.pets))
  .catch((error) => console.log(error));

};


// details show er jnno
const loadDetails = async(petId) =>{
  console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    //console.log(data);
    displayDetails(data.petData);
};

// details er jnno
const displayDetails = (idPet) => {
    // console.log(idPet);
    const detailContainer = document.getElementById("modal-content")
    document.getElementById("customModel").showModal();

    detailContainer.innerHTML = `
   <img src=${idPet.image} />
   <h2 class="text-xl font-bold">${idPet.pet_name}</h2>
        <p class="m-0 flex items-center gap-2 text-neutral-600">
            <img src="https://img.icons8.com/ios/50/000000/grid.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Breed: ${idPet.breed ? idPet.breed : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2 text-neutral-600">
            <img src="https://img.icons8.com/ios/50/000000/birth-date.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Birth: ${idPet.date_of_birth ? idPet.date_of_birth : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2 text-neutral-600">
            <img src="https://img.icons8.com/ios/50/000000/gender.png"" alt="Grid Icon" class="w-6 h-6"/>
            <span>Gender: ${idPet.gender ? idPet.gender : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2 text-neutral-600">
            <img src="https://img.icons8.com/ios/50/000000/us-dollar-circled.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Price: ${idPet.price ? `$${idPet.price}` : "Not Mentioned"}</span>
        </p>
    <hr>
    <h3 class="text-xl font-bold">Pet Details</h3>
    <p class="text-neutral-600 pb-3 pt-3 lg:text-xl font-medium sm:text-sm">${idPet.pet_details}</p>

  `;
}


//spinner fn
const handleSearch=() => {
  document.getElementById("spinner").style.display= "block";
  setTimeout(function () {
    loadAllPhones()
    },2000)
    

}
//spinner fn
const loadAllPhones = () => {
  document.getElementById("spinner").style.display= "none";
  console.log("2 sec");
}

// for sorting by price
const fetchAndSortPetsByPrice = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      // Sort the pets by price in descending order
      const sortedPets = data.pets.sort((a, b) => b.price - a.price);
      // Display only the sorted pets
      displayAll(sortedPets);
    })
    .catch((error) => console.log(error));
};

//fetch and display all pets when "View More" is clicked
const viewMorePets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAll(data.pets))
    .catch((error) => console.log(error));
};


//all cart display
const displayAll = (pets) => {
  const allItems = document.getElementById("allItems");
  allItems.innerHTML = "";
  // Check if there are no pets
  if (pets.length == 0) {
    allItems.classList.remove("grid");
    allItems.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center">
      <img src="images/error.webp" />
      <h2 class="text-xl font-bold">No Information Available</h2>
      <p class="text-neutral-600 pb-3 pt-3 lg:text-2xl font-medium text-center sm:text-sm"> This section has no content to show </p>
    </div>`;
    return;
  } else {
    allItems.classList.add("grid");
  }
  
  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card card-compact border-2 p-4";
    card.innerHTML = `
      <figure class="h-[200px]">
        <img src=${pet.image} alt="Pet Image" class="h-full w-full object-cover"/>
      </figure>
      <div class="card-body h-auto w-full p-2">
        <h2 class="card-title">${pet.pet_name}</h2>
        <p class="m-0 flex items-center gap-2">
            <img src="https://img.icons8.com/ios/50/000000/grid.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Breed: ${pet.breed ? pet.breed : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2">
            <img src="https://img.icons8.com/ios/50/000000/birth-date.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Birth: ${pet.date_of_birth ? pet.date_of_birth : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2">
            <img src="https://img.icons8.com/ios/50/000000/gender.png"" alt="Grid Icon" class="w-6 h-6"/>
            <span>Gender: ${pet.gender ? pet.gender : "Not Mentioned"}</span>
        </p>
        <p class="m-0 flex items-center gap-2">
            <img src="https://img.icons8.com/ios/50/000000/us-dollar-circled.png" alt="Grid Icon" class="w-6 h-6"/>
            <span>Price: ${pet.price ? `$${pet.price}` : "Not Mentioned"}</span>
        </p>


        <div class="flex justify-center items-center mt-1 p-0 gap-2">
          <button class="btn btn-primary p-1 min-w-[60px] flex items-center text-sm bg-slate-300  border-none hover:bg-lime-200" onclick="addToLikedPets('${pet.image}')">
             <img src="https://img.icons8.com/?size=100&id=2744&format=png" alt="Thumbs Up" class="w-4 h-4 mr-1">
          </button>
          <button class="btn btn-primary p-1 min-w-[60px] text-sm bg-slate-300 text-teal-700 border-none hover:bg-lime-200" onclick="startAdoption(this)">Adopt</button>
          <button onclick="loadDetails(${pet.petId})" class="btn btn-primary p-1 min-w-[60px] text-sm text-teal-700 bg-slate-300  border-none hover:bg-lime-200">Details</button>
        </div>

      </div>
    `;
    allItems.appendChild(card);
  });
};

// fn for adopt
// Start the adoption process
const startAdoption = (button) => {
  
  document.getElementById("adoptModal").checked = true;

  let countdownValue = 3; 
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = countdownValue; 

  
  const countdownInterval = setInterval(() => {
    countdownValue -= 1; 
    countdownElement.textContent = countdownValue; 

   
    if (countdownValue === 0) {
      clearInterval(countdownInterval); 
      button.textContent = "Adopted";
      button.disabled = true; 

      document.getElementById("adoptModal").checked = false; 
    }
  }, 1000);
};



// fn for like button
const likedPets = []; 

const addToLikedPets = (imageSrc) => {
  likedPets.push(imageSrc); 

  const allItems2 = document.getElementById("allItems2");
  allItems2.innerHTML = ""; 

  likedPets.forEach((src) => {
    const imageElement = document.createElement("img");
    imageElement.src = src; 
    imageElement.alt = "Liked Pet";
    imageElement.className = "object-cover"; 

    allItems2.appendChild(imageElement); 
  });
};




loadCategories();
loadAllCategories();    
