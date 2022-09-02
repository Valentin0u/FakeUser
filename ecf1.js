

const getUsers = (e) => {
    e.preventDefault();
    const usersNumber = document.querySelector('input[name="number"]:checked').value;
    const usersGender = document.querySelector('input[name="gender"]:checked').value;
    const url = `https://randomuser.me/api/?gender=${usersGender}&results=${usersNumber}`;
    console.log(url);
    fetch(url)
        .then(response => {

            if (response.status !== 200) {
                throw Error("Error")
            } else {
                return response.json()
            }

        }).then(json => showUsers(json.results))
        .catch(err => { 
            console.log(err);
        })
}

const showUsers = (users) => {
    let resultArea = document.querySelector('.user-list');
    resultArea.textContent = '';
    users.forEach(user => {
        console.log(user);

        const userName = ` ${user.name.first} ${user.name.last}`;
        const rawDate = user.dob.date.split('T');
        let userDob = rawDate[0].split('-').reverse().join('/');
        const userEmail = user.email;
        const userPhone = user.phone;
        const userLocation = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`;
        const userImg = user.picture.large;
        const userPassword = user.login.password;
        console.log(userName);
        
        resultArea.innerHTML += `<div class='user-list-item'>
        <img src='${userImg}'/> 
        <p style="text-align:center; color:black; font-size:larger">${userName}</p>
        <br>
        <br>
        <i class="fa-solid fa-envelope"></i> ${userEmail}
        <br>
        <br> 
        <i class="fa-solid fa-cake-candles"></i> ${userDob}
        <br>
        <br>
        <i class="fa-solid fa-map-location-dot"></i> ${userLocation}
        <br>
        <br> 
        <i class="fa-solid fa-phone"></i> ${userPhone}
        <br>
        <br>
        <i class="fa-solid fa-lock"></i> ${userPassword}
        </div>`
    });
}

document.querySelector('.filters').addEventListener('submit', getUsers)

function refreshPage(){
    window.location.reload();
} 

