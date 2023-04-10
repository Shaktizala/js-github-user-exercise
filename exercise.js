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

async function getData() {
    let userCount = 0
    let emptyUserCount = 0

    ShowAwaiting();
    try {
        console.time('Execution Time')
        await fetch("https://api.github.com/users", {
            method: 'GET',
            headers: {
                'x-ratelimit-limit': '100'
            }
        })
            .then((result) => result.json())
            .then((data) => {
                data.filter((item) => {
                    if(Object.keys(item).length === 0){
                        userCount++
                        return true
                    }else{
                        emptyUserCount++;
                        return false
                    }
                })
                console.log(data)
                console.log(userCount)
                console.log(emptyUserCount)
            });
        console.timeEnd('Execution Time')
    }
    catch (error) {
        reject('error while fetching')
    }
    finally {
        clearInterval(twirlTimer)
    }
}
getData()

