# DSD604_2_ReactNativeProject
Created Assets and Components folders
<img src="https://user-images.githubusercontent.com/87359394/229962247-ecd37375-ccfb-4811-becd-85e8f3710cb4.png" width=75% height=50%>
Game Overview:A json array of countries and their details is loaded up into the game. From these details a randomly selected country is chosen, and the name of the counry is shown on the screen. The player then has to choose the name of the capital city from that country.
An SQLite database holds all the cities the player gets wrong. An API calls the weather details fo a selected city.
Created the Game Screen, Clicking Choose a Random Country button generates a random entry
<img src="https://user-images.githubusercontent.com/87359394/229964606-386be3c7-60dd-4c2d-8ec0-d4fee1173134.jpg" width="300" height="600">

Using a Select (a dropdown) shows a list of all the cities. The player has to pick the correct city.
<img src="https://user-images.githubusercontent.com/87359394/229964706-a9a46b9f-4c77-4e24-bb01-97e6f01df0a5.jpg" width=75% height=75%>
<img src="https://user-images.githubusercontent.com/87359394/229965301-d9d7b29e-ea05-473f-a828-ee4ff1852798.jpg" width=75% height=75%>

The Database Screen:
<img src="https://user-images.githubusercontent.com/87359394/229965362-f15aa7ed-fa90-4b68-8997-817ef7759063.jpg" width="300" height="600">
<img src="https://user-images.githubusercontent.com/87359394/229965414-1ed7fe70-71ce-4389-a8a2-5a059e32e7e2.jpg" width="300" height="600">
The Navigation Screen:
<img src="https://user-images.githubusercontent.com/87359394/229966108-bce1dba6-be48-482b-9495-7fcad06a2b05.jpg" width="300" height="600">

Coding outline
This game will take a little planning.
• Used State Hooks. 
• Used a useEffect hook, to initialse the gameplay when start.
• Used functions and functional components rather than classes.
• Arrays. Added to need arrays to hold all the countries, the cities, the correct answers, the incorrect answers etc.
• Created 3 extra components and include them into your project. I used db, quiz and API for the Weather section.
