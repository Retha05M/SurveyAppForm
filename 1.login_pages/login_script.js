
//retrieving data from the db and posting to the db
let url= "http://localhost:3000/users";

async function getUsers(){
    let usersResults= await fetch(url,{
        method: 'GET'
        })

    let jsonResults= await usersResults.json();
    return jsonResults

}

async function postUserData(data){
    try{
        const responseData= await fetch(url,{
            method:'POST',
            cache:'no-cache',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });
        return responseData.json();

    }catch (err){
       console.log('found this error', err);
    }

}

const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/accounts', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        })
        return response.json();
    } catch (err) {
        console.log(err)
    }
}

async function updateData(id,data) {
    try {
        const response = await fetch(`${url}/${id}`, {
        method: "PUT", 
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (err) {
      console.log("found error", err);
    }
  }

//pop-ups and classes
let sign_up_popup_form= document.querySelector('.sign_up_form_popup') 
let sign_in_popup_form= document.querySelector('.sign_in_form_popup')
let sign_up_here= document.querySelector('.register')
let sign_up_btn= document.querySelector('.submitBtn')
let sign_in_btn=document.querySelector('.signInBtn')


// signing up
sign_up_here.addEventListener('click',(e)=>{
    e.preventDefault()

    sign_up_popup_form.style.display='block'
    sign_in_popup_form.style.display='none'



})

//Getting the user's sign up values
let names= document.querySelector('#signUp_name')
let surname= document.querySelector('#signUp_surname')
let position= document.querySelector('#position')
let email= document.querySelector('#email')
let password= document.querySelector('#password')
// let confirm_pw= document.querySelector('#confirm_password')
let is_admin= document.querySelector('#admin_options')


// Entering user details to sign up
sign_up_btn.addEventListener('click',(e)=>{
    e.preventDefault()
   

    let nameValue=names.value
    let surnameValue=surname.value
    let positionValue=position.value
    let emailValue=email.value
    let passwordValue=password.value
    
    // isAdmin:isAdminValue,


    let user_data={
        Name:nameValue,
        Surname:surnameValue,
        Position:positionValue,
        Email:emailValue,
        Password:passwordValue
    }

    console.log(nameValue,surnameValue,passwordValue)

    postUserData(user_data).then(result=>{
        console.log(result)
    })

    // if(passwordValue ==''){
    //     alert('Please Enter a password')
    //     sign_up_popup_form.style.display='block'
    //     sign_in_popup_form.style.display='none'
    // }
    
    // if(emailValue ==''){
    //     alert('Please enter your email address')
    //     sign_up_popup_form.style.display='block'
    //     sign_in_popup_form.style.display='none'
    // }




    document.querySelector('#signUp_name').value = '';
    document.querySelector('#signUp_surname').value = '';
    document.querySelector('#position').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#email').value = '';
    // document.querySelector('#confirm_password').value = '';
    document.querySelector('#admin_options').value = '';


    sign_up_popup_form.style.display='none'
    sign_in_popup_form.style.display='block'



})







let user;


const getStartingUserData = async () => {
        // let emailValues=user_email.value
        // let passwordValues=user_password.value
        let isAdminValue=is_admin.value
        

        // getUsers().then(result=>{
        //     console.log(result)
    
        //     result.forEach(user=>{
                sign_in_btn.addEventListener('click',(e)=>{
                    e.preventDefault()
                    let user_email= document.querySelector('#user_email').value;
                    let user_password= document.querySelector('#user_password').value;



                   

                //     getUsers().then(result=>{

                //         if(user.Email == user_email)

                //         result.forEach(user=>{
                //             if(user.isAdmin=='null'){
                //                  if(isAdminValue==='yes'){
                //                         isAdminValue=1
                //                         updateData(user.)
                //             }else{
                //                 isAdminValue=0
                //             }
                //         }
                //     })
                // })
                

                    login(user_email,user_password).then(user => {
                        // sessionStorage.setItem('user',user.User_Id)
                        sessionStorage.setItem('user', JSON.stringify({
                            name: user.Name,
                            id: user.User_Id
                        }))


                        console.log(user)

                        if(user.isAdmin=='1'){
                            window.location.href = '../2.admin_portal/admin_panel.html'
                        }else{
                            window.location.href ='../3.user_portal/user_panel.html'
                        }
                        
                    })





                    // if(user.Email == user_email && user.Password == user_password){
                    //      console.log(`email is ${user_email} from user and db is ${user.Password}`)
                    //     console.log('found',user)
                    //     }
            })
       
//     })
// })




}



getStartingUserData()