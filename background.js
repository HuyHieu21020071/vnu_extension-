var log = document.getElementById('log');
function getCookieOfCurrentTab() {
    var cookieValues;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.cookies.getAll({ url: tabs[0].url }, function (cookies) {
            cookieValues = cookies.map(function (cookie) {
                return cookie.name + "=" + cookie.value;
            }).join(";");

            console.log(cookieValues);
        })
    });
    return cookieValues
}

let intervalId;

const executeTasks = async (cookie) => {
    const taskPayloads = [{
        number: 610,
        cookie: cookie
    }, {
        number: 397,
        cookie: cookie
    },
    {
        number: 611,
        cookie: cookie
    },
    {
        number: 570,
        cookie: cookie
    }]

    for (const taskPayload of taskPayloads) {
        await callRegist(taskPayload.number, taskPayload.cookie);
        // sleep for 0.5 seconds
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    callConfirm(cookie)

    console.log("Tasks completed");
};

const startLoop = async () => {
    console.log(intervalId)
    if (intervalId) {
        console.log("Received message to start loop from content.js");
        const cookie = getCookieOfCurrentTab();

        // Start the loop and store the interval ID
        while (intervalId) {
            await executeTasks(cookie);
        }

        return true;
    }
    return false;
};

const stopLoop = () => {
    if (intervalId) {
        console.log("Received message to stop loop from content.js");

        // Clear the interval and reset the intervalId
        clearInterval(intervalId);
        intervalId = null;

        return true;
    }
    return false;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("test");
    if (request.greeting === "run") {
        intervalId = 1;
        return startLoop();
    } else if (request.greeting === "stop") {
        return stopLoop();
    }
});




function callConfirm(cookie) {
    const url = 'https://dangkyhoc.vnu.edu.vn/xac-nhan-dang-ky/1';

    const headers = {
        'authority': 'dangkyhoc.vnu.edu.vn',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'content-length': '0',
        'cookie': cookie,
        'origin': 'https://dangkyhoc.vnu.edu.vn',
        'referer': 'https://dangkyhoc.vnu.edu.vn/dang-ky-mon-hoc-nganh-1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'x-requested-with': 'XMLHttpRequest'
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed');
            }
        })
        .then(data => {
            console.log(data);
            // Handle the API response data
            // Add data to the log element
            log.innerHTML += '<p>' + data.message + '</p>';

        })
        .catch(error => {
            console.error(error);
            // Handle the error
        });
}

async function callRegist(number, cookie) {
    const url = `https://dangkyhoc.vnu.edu.vn/chon-mon-hoc/${number}/1/1/novalue`;

    const headers = {
        'authority': 'dangkyhoc.vnu.edu.vn',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9',
        'content-length': '0',
        'cookie': cookie,
        'origin': 'https://dangkyhoc.vnu.edu.vn',
        'referer': 'https://dangkyhoc.vnu.edu.vn/dang-ky-mon-hoc-nganh-1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'x-requested-with': 'XMLHttpRequest'
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        credentials: 'include'
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        throw new Error('Request failed');
    }
} 