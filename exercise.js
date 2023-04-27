let twirlTimer
function ShowAwaiting() {
    twirlTimer = (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
            process.stdout.write("\r" + P[x++]);
            process.stdout.write(" loading");
            x &= 3;
        }, 250);
    })();
}

const users = ['Shaktizala', 'invalid-user', 'chintansakhiya','asdfakjlhdf','slfklasdf']
let userDetails = []
let validUserCount = 0
let invalidUserCount = 0
let isExecuted = false

// function getUsers() {
//   ShowAwaiting()
//   console.time('Exectuion Time:')
//   const requests = users.map((name) =>
//     fetch(`https://api.github.com/users/${name}`,{
//       headers : {
//         'authorization' : 'token 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'
//       }
//     })
//     );

//   try {
//     Promise.all(requests)
//     .then(responses => responses.forEach(
//       response => {
//         if(response.status === 200){
//           validUserCount++;
//           response.json().then((data)=> userDetails.push(data))
//         }else{
//           invalidUserCount++;
//         }
//         isExecuted = true
//       }
//     ));
//   } catch (err) {
//     console.log(err)
//   }
//   console.timeEnd('Exectuion Time:')
// }
  
// getUsers(users)

function getUserDetails(){
  ShowAwaiting()
  console.time('Exectuion Time:')

  for(userName in users){
      detail = fetch(`https://api.github.com/users/${users[userName]}`,{
      headers : {
        'authorization' : 'token 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'
      }
    }).then((data)=>data.json())
      .then((res) => {userDetails.push(res)
      if (res.message=="Not Found"){
            invalidUserCount++;
        }
      })
  }
}
getUserDetails()
var intId = setInterval(function(){
  if(userDetails.length === users.length) {
    clearInterval(intId)
    clearInterval(twirlTimer)
    console.log(userDetails)
    console.log('valid users:', users.length-invalidUserCount);
    console.log('invalid users:', invalidUserCount);
    console.timeEnd('Exectuion Time:')
  }
},25)
