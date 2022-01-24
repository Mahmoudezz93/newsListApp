Welcome to The News App 
Developed by: Mahmoud Ezz 

Introduction:
News app is a simple application used to show headlines from news about diffrent topics from diffrent news sources
==================================================================================================================

Features: 
    1. Show diffrent main headlines about a bussiness in a select country 
        a. show the headline main title 
        b. author name 
        c. date of publishing 
        d. image 
        e. url of source of 

    2. Show the different news sources to select and show the recent news from the source 
        a. different sources with its:
            1. name 
            2. country 
            3. language 
        b. select the source and show the main headlines presented by the selected source 
        c. show the details of the headline as in feature number 1.
    
    3. Show the history of the user clicked headlines 
        a. show them in a descending order 
        b. select the headline to show it's details as in feature number 1, and 2  
        
===================================================================================================================

Approach and steps for the project: 
    
    1. First create a repo that will contain the project 
    2. Create a react native project using react native CLI 
    3. Create folder structure to containg the navigation and screens folder 
    4. Create the app container that will include all the navigation stacks and screens 
    5. Create the config file that will have the constants for the APIs requests 
    6. Install react navigation, and the other dependencies for re-animated,redux and icons   
    7. Install bottom tab navigator and add it to the navigation app container 
    8. create three folders each will have its stack (News, Soucrces, and History)
    9. For the News stack:
        a. will fetch the data and show it as the UI represent
        b. create a sub page that show the data sent from the parent page for the details of the headline
    10.For the Sources stack: 
        a. will fetch the data about the different news sources 
        b. create a sub page the show the main headlines of the selected source 
        c. create a sub page that show the data sent from the parent page for the details of the headline
    11.Create Redux store 
        a.Create Actions which will contain the diffrent action types (must be pre-defined to prevent mis-typing)
        b.Define the different payloads that with will be sent with the action types to the reduer (add,delete,select, and de-select item)
        c.Create the reducer 
            a.define the inital state 
            b.add different cases for updating the inital state (add item, delete, select and deselect)
        d.combine the reducer and export it to the app.js 
        e.create the store in the app.js page 
    12.Use the redux cart to add clicked headlines from both the news and sources stacks 
    13.Receive the cart items in the history stack to show the viewed headline
        a.create a sub page that show the data sent from the parent page for the details of the headline

===================================================================================================================
