// 🛠️ STEP 1: Fetch GitHub Data
// 1️⃣ Use Axios to send a GET request to `https://api.github.com/users/your_github_username`.
// 2️⃣ Log the response data to inspect its structure.
// 3️⃣ Look at important fields like `name`, `avatar_url`, `location`, `followers`, `following`, `bio`, and `followers_url`.
// 4️⃣ Pass the data into a function to create a user card.
// 5️⃣ Append the created card to the `.cards` container in the DOM.


// 🛠️ STEP 2: Create a Function to Build the Card
// 1️⃣ Write a function that takes a **user object** as a parameter.
// 2️⃣ Use JavaScript DOM methods to create the following structure:
//
//     <div class="card">
//       <img src="{avatar_url}" />
//       <div class="card-info">
//         <h3 class="name">{name}</h3>
//         <p class="username">{login}</p>
//         <p>Location: {location}</p>
//         <p>Profile: <a href="{html_url}">{html_url}</a></p>
//         <p>Followers: {followers}</p>
//         <p>Following: {following}</p>
//         <p>Bio: {bio}</p>
//       </div>
//     </div>
//
// 3️⃣ Return the created card element.


// 🛠️ STEP 3: Add the Card to the DOM
// 1️⃣ Call the function with the GitHub data.
// 2️⃣ Select the `.cards` container using `document.querySelector('.cards')`.
// 3️⃣ Append the created card to the `.cards` container.


// 🛠️ STEP 4: Fetch Followers Data
// 1️⃣ Use the `followers_url` from the GitHub user data or 
        //Use this: https://api.github.com/users/your_username/followers
// 2️⃣ Send a GET request to fetch follower information.
// 3️⃣ Log the response data to inspect its structure.
// 4️⃣ For each follower:
//     - Create a card using the function.
//     - Append the card to the `.cards` container.


// 🛠️ STRETCH: Add More GitHub Users
// 1️⃣ Create an array `followersArray` with at least 5 GitHub usernames.
// 2️⃣ Loop through the array and send a GET request for each username.
// 3️⃣ Create a card for each user and append it to `.cards`.
function fetchGitHubData(username) {
        axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
        const userData = response.data;
        console.log(userData);
        document.querySelector('.cards').innerHTML = ''; // Clear existing cards
        document.querySelector('.cards').appendChild(createCard(userData));
        checkforFollowers(userData);
        }).catch(error => {
                console.error("Error fetching GitHub data:", error);
        });
}

fetchGitHubData("ayuubthegreat");
const createCard = function(user) {
        // The MAIN card structure
        const card = document.createElement('div');
        card.classList.add('card');
        // The avatar image
        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;
        avatar.alt = `${user.name}'s avatar`;
        card.append(avatar);
        // The actual user information
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
        // Children of the card 
        // Handle name
        const user_name = document.createElement('h3');
        user_name.classList.add('name');
        user_name.textContent = user.name;
        // Username (login)
        const username = document.createElement('p');
        username.classList.add('username');
        username.textContent = user.login;
        // Location
        const location = document.createElement('p');
        location.textContent = `Location: ${user.location || 'Could not find location'}`;
        // Profile link
        const profileLink = document.createElement('p');
        profileLink.innerHTML = `Profile: <a href="${user.html_url}" target="_blank">${user.html_url}</a>`;
        // Followers 
        const followers = document.createElement('p');
        followers.textContent = `Followers: ${user.followers || `Couldn't find followers. Sorry!`}`;
        // Following 
        const following = document.createElement('p');
        following.textContent = `Following: ${user.following || `Couldn't find any people whom this person is following. Sorry!`}`;
        // Bio
        const bio = document.createElement('p');
        bio.textContent = `Bio: ${user.bio || `Couldn't find bio. Sorry!`}`;
        cardInfo.append(user_name, username, location, profileLink, followers, following, bio);
        card.append(cardInfo);
        return card;


}
const checkforFollowers = function(...userData) {
        if (userData.followers != 0) {
        // Fetch followers data using the followers_url
        console.log("This user has followers. Fetching data...");
        for (let user of userData) {
                axios.get(user.followers_url)
                .then(response => {
                        const followersData = response.data;
                        followersData.forEach(follower => {
                                document.querySelector('.cards').appendChild(createCard(follower));
                        });
                }).catch(error => {
                        console.error("Error fetching followers data:", error);
                });
        }
        } else {
                console.log("This user has no followers.");
        }
}



// 🌟 BONUS TIP:
// 🎨 Style your cards using CSS to make them look polished!
// 🤖 Try experimenting with different GitHub profiles!
