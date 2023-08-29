const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById('phone-container')
  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  }
  else {
    showAllContainer.classList.add('hidden')

  }

  // display only first 12 phones
  if (!isShowAll) {
    phones = phones.slice(0, 12);

  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);

}
// 
const handleShowDetail = async (id) => {
  console.log('clicked show details', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json()
  const phone=data.data;
  // console.log(data)
  showPhoneDetails(phone)

}
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML=`
  <img src="${phone.image}" alt=""/>
  <p><span>Storage:</span>${phone.mainFeatures?.storage}</p>
  `

  // show the modal
  show_details_modal.showModal();
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  console.log('hi')
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

// const handleSearch2 =()=>{
//   toggleLoadingSpinner(true);
//   const searchField =document.getElementById('search-field2');
//   const searchText = searchField.value;
//   loadPhone(searchText);
// }
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}
// handle Show All
const handleShowAll = () => {
  handleSearch(true);

}
loadPhone();