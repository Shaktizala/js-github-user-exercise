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

async function getUsers() {
  ShowAwaiting()
  console.time('Exectuion Time:')
  const requests = users.map((name) =>
    fetch(`https://api.github.com/users/${name}`,{
      headers : {
        'authorization' : 'token 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'
      }
    })
    );

  try {
    Promise.all(requests)
    .then(responses => responses.forEach(
      response => {
        if(response.status === 200){
          validUserCount++;
          response.json().then((data)=> userDetails.push(data))
        }else{
          invalidUserCount++;
        }
        isExecuted = true
      }
    ));
  } catch (err) {
    console.log(err)
  }
  console.timeEnd('Exectuion Time:')
}
  
getUsers(users)
var intId = setInterval(function(){
  if(isExecuted == true) {
    clearInterval(intId)
    clearInterval(twirlTimer)
    console.log(userDetails)
    console.log('valid users:', validUserCount);
    console.log('invalid users:', invalidUserCount);
  }
},25)
