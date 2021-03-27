var selectedBusiness = -1;
var money = 200;
var bankMoney = 0;
var selectedBank = 0;
var day = 1;
var auto = false;

// [ID, AMOUNT]
var shares = [];

//[NAME, [VALUE], ID, shares, dividends]
var businesses = [["SEFFCO", [50], 0, 10, 4], ["DTVOGS", [50], 1, 20, 2], ["JVNPLS", [50], 2, 25, 0]];

function business(idNum)
{
    selectedBusiness = idNum;
    if (idNum === -1)
    {
        
    }
    console.log("Load graph: " + idNum);
    drawGraph(idNum.toString());
    updateData();
}

function nextDay()
{
    day++;
    for (var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][1] != "bankrupt")
        {
            if (businesses[i][1].length === 16)
            {
                businesses[i][1].splice(0, 1);
            }


            if (randomIntFromInterval(0, 1))
            {
                //rise
                businesses[i][1].push(businesses[i][1][businesses[i][1].length-1] + randomIntFromInterval(0, 20));
            }
            else
            {
                //fall
                businesses[i][1].push(businesses[i][1][businesses[i][1].length-1] - randomIntFromInterval(0, 20));
                if (businesses[i][1][businesses[i][1].length-1] <= 0)
                {
                    businesses[i][1] = "bankrupt"
                    document.getElementById(i).classList.replace("business", "bankrupt");
                }
            }
        }
    }
    if (randomIntFromInterval(0, 10) > 9)
    {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var name = "";
        for (var i = 0; i < 6; i++)
        {
            name += alphabet[randomIntFromInterval(0, 25)];
        }
        var newBus = [];
        var budget = [50]
        newBus.push(name);
        newBus.push(budget);
        newBus.push(businesses.length);
        newBus.push(randomIntFromInterval(5, 30));
        newBus.push(randomIntFromInterval(0, Math.floor(50/newBus[3])));
        businesses.push(newBus);

        var businessList = document.getElementById('businesses');
        var button = document.createElement("button");
        button.textContent = name;
        button.classList.add('business');
        button.id = businesses.length;
        button.setAttribute('onclick', "business(" + businesses.length + ")");
        businessList.appendChild(button);
    }
    console.log(businesses);

    var businessList = document.getElementById('businesses');
    while (businessList.firstChild)
    {
        businessList.removeChild(businessList.lastChild);
    }

    for (var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][1] === "bankrupt")
        {
            businesses.push(businesses[i]);
            businesses.splice(i, 1);
        }
    }

    var businessList = document.getElementById('businesses');
    var button = document.createElement("button");
    button.textContent = "ALL";
    button.classList.add('business');
    button.setAttribute('onclick', 'business(-1)');
    businessList.appendChild(button);

    businesses.sort(function(a, b) {return b[1][b[1].length-1]-a[1][a[1].length-1]});
    for (var i = 0; i < businesses.length; i++)
    {
        var setId = businesses[i][2];
        var businessList = document.getElementById('businesses');
        var button = document.createElement("button");
        button.textContent = businesses[i][0];

        if (businesses[i][1] === "bankrupt")
            button.classList.add('bankrupt');
        else
            button.classList.add('business');


        button.id = setId.toString();
        button.setAttribute('onclick', 'business(' + setId + ')');
        businessList.appendChild(button);
    }

    for (var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][1] === "bankrupt")
        {
            businesses.push(businesses[i]);
            businesses.splice(i, 1);
        }
    }

    drawGraph(selectedBusiness);


    //CHANGE DATA
    dividends();
    bankInterest();
    updateData();
}

function updateData()
{
    var businessData = document.getElementById(selectedBusiness);
    var business;
    for (var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][0] === businessData.textContent)
        {
            business = businesses[i];
        }
    }

    var companyName = document.createElement("h2");
    companyName.textContent = "Name: " + business[0];
    var companyValue = document.createElement("p");
    companyValue.textContent = "Current Value: " + "$" + business[1][business[1].length-1];
    var companyShares = document.createElement("p");
    companyShares.textContent = "Shares Left: " + business[3];
    var companyDividends = document.createElement("p");
    companyDividends.textContent = "Dividends: " + business[4] + "%";
    var buyShare = document.createElement("button");
    buyShare.setAttribute('onclick', "buyShare(" + business[2] + ")");
    buyShare.textContent = "Buy Share";
    var playerHeading = document.createElement("h2");
    playerHeading.textContent = "You";
    var playerBalance = document.createElement("p");
    playerBalance.textContent = "Money: $" + money;
    var sharesHeading = document.createElement("p");
    sharesHeading.textContent = "Shares Owned: ";

    var info = document.getElementById('info');

    //DELETE ALL CHILDREN
    while (info.firstChild)
    {
        info.removeChild(info.lastChild);
    }

    info.appendChild(companyName);
    info.appendChild(companyValue);
    info.appendChild(companyShares);
    info.appendChild(companyDividends);
    info.appendChild(buyShare);
    info.appendChild(playerHeading);
    info.appendChild(playerBalance);
    info.appendChild(sharesHeading);

    shares.sort(function(a, b) {return b[1]-a[1]});

    for (var i = 0; i < shares.length; i++)
    {
        if (shares[i][1] === 0)
        {
            shares.splice(i, 1);
        }
        var businessID = shares[i][0];
        var businessShare;
        for (var j = 0; j < businesses.length; j++)
        {
            if (businesses[j][2] === businessID)
                businessShare = businesses[j];
        }
        var share = document.createElement("ul");
        var sellButton = document.createElement("button");
        sellButton.textContent = "Sell";
        sellButton.setAttribute('onclick', "sellShare(" + businessShare[2] + ")");
        share.textContent = businessShare[0] + ": " + shares[i][1] + " ";
        share.appendChild(sellButton);
        document.getElementById('info').appendChild(share);
    }

    var bankBalance = document.getElementById('inBankMoney');
    var handBalance = document.getElementById('onHandMoney');

    bankBalance.textContent = "$" + bankMoney;
    handBalance.textContent = "$" + money;
}

function randomIntFromInterval(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawGraph(id)
{
    var button = document.getElementById(id);
    var business;
    for (var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][0] === button.textContent)
        {
            business = businesses[i];
        }
    }
    var c = document.getElementById("graph");
    var ctx = c.getContext("2d");

    clearGraph();
    var w = c.width;
    c.width = 1;
    c.width = w;

    for (var i = 1; i < business[1].length+1; i++)
    {
        var text = "";
        if (business[1][i] > business[1][i-1])
        {
            ctx.strokeStyle = "#3CAEA3";
            ctx.lineWidth = 5;
            text = "+" + (Number(business[1][i]) - Number(business[1][i-1]).toString());
        }
        else if (business[1][i] === business[1][i-1])
        {
            ctx.strokeStyle = "#F6D55C";
            ctx.lineWidth = 5;
            text = "+0";
        }
        else
        {
            ctx.strokeStyle = "#ED553B";
            ctx.lineWidth = 5;
            text = "-" + (Number(business[1][i-1]) - Number(business[1][i]).toString());
        }
        ctx.beginPath();
        //ctx.line((i-1) * 10, c.height - business[1][i-1] / 3, i*10, c.height - business[1][i] / 3);

        ctx.moveTo((i-1) * 30 , c.height - business[1][i-1] / 3);
        ctx.lineTo(i*30, c.height - business[1][i] / 3);
        ctx.stroke();

        

        ctx.font = "15px Georgia";
        ctx.fillStyle = "#173F5F";
        //ctx.fillStyle = "#20639B";
        ctx.fillText(text, (i*30) - 5, (c.height - business[1][i] / 3) - 10);
    }
    ctx.font = "30px Georgia";
    ctx.fillStyle = "#173F5F";
    ctx.fillText(business[0], 0, 30);
}

function clearGraph()
{
    var c = document.getElementById("graph");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);
    var w = c.width;
    c.width = 1;
    c.width = w;
}

function toggleAuto()
{
    if (auto)
        auto = false;
    else
        auto = true;
}

var autoClock = setInterval(() => {
    if (auto)
    {
        nextDay();
    }
}, 100);

function buyShare(id)
{
    var business;
    var businessPos;
    for ( var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][2] === id)
        {
            business = businesses[i];
            businessPos = i;
        }
    }

    if (money < business[1][business[1].length-1])
    {
        alert("not enough money");
    }
    else
    {
        if (business[1] === "bankrupt")
            return;
        if (businesses[businessPos][3] === 0)
            return;
        money -= business[1][business[1].length-1];
        businesses[businessPos][3]--;
        var ids = []
        for (var i = 0; i < shares.length; i++)
        {
            ids.push(shares[i][0]);
        }

        if (ids.includes(id))
        {
            shares[ids.indexOf(id)][1]++;
        }
        else
        {
            var share = [];
            share.push(id);
            share.push(1);
            shares.push(share);
        }
    }
    updateData();
}

function sellShare(id)
{
    var business;
    var businessPos;
    for ( var i = 0; i < businesses.length; i++)
    {
        if (businesses[i][2] === id)
        {
            business = businesses[i];
            businessPos = i;
        }
    }

    for (var i = 0; i < shares.length; i++)
    {
        if (shares[i][0] === id)
        {
            if (shares[i][1] != 0)
            {
                if (business[1] === "bankrupt")
                {
                    money += 0;
                    shares[i][1]--;
                }
                else
                {
                    money += business[1][business[1].length-1];
                    shares[i][1]--;
                }
                businesses[businessPos][3]++;
            }
        }
    }
    updateData();
}

function dividends()
{
    if (day % 7 != 0)
        return;
    //add money depending on dividend % and current value]
    for (var i = 0; i < shares.length; i++)
    {
        for (var j = 0; j < businesses.length; j++)
        {
            if (shares[i][0] === businesses[j][2] && shares[i][1] != 0 && businesses[j][1] != "bankrupt")
            {
                money+= Math.floor(Math.round(((businesses[j][4] / 100) * businesses[j][1][businesses[j][1].length-1]) * 100)) / 100;
            }
        }
    }
}

function bankInterest()
{
    if (day % 7 != 0)
        return;
    //add money depending on money in bank and interest rate
    if (selectedBank === 0)
    {
        return;
    }
    else if (selectedBank === 1)
    {
        bankMoney += bankMoney*5/100;
    }
    else if (selectedBank === 2)
    {
        bankMoney += bankMoney*10/100;
    }
}

var stockTab = document.getElementById('stockTab');
var bankTab = document.getElementById('bankTab');
var businessTab = document.getElementById('businessTab');

function setStockTab() {
    stockTab.style.marginLeft = "0px";
    bankTab.style.marginLeft = "1500px";
    businessTab.style.marginLeft = "1500px";
}

function setBankTab() {
    stockTab.style.marginLeft = "1500px";
    bankTab.style.marginLeft = "0px";
    businessTab.style.marginLeft = "1500px";
}

function setBusinessTab() {
    stockTab.style.marginLeft = "1500px";
    bankTab.style.marginLeft = "1500px";
    businessTab.style.marginLeft = "0px";
}

setStockTab();






//BANK
function selectBank(option) {
    if (option === selectedBank)
    {
        alert('This is your current bank');
        return;
    }

    var bankOne = document.getElementById('bankOptionOne');
    var bankTwo = document.getElementById('bankOptionTwo');
    var bankThree = document.getElementById('bankOptionThree');

    if (option === 1 && money >= 5000)
    {
        money -= 5000;
        selectedBank = 1;
        bankOne.classList.replace('bankOptionSelected', 'bankOption');
        bankTwo.classList.replace('bankOption', 'bankOptionSelected');
        bankThree.classList.replace('bankOptionSelected', 'bankOption');
    }
    else if (option === 2 && money >= 10000)
    {
        money -= 10000;
        selectedBank = 2;
        bankOne.classList.replace('bankOptionSelected', 'bankOption');
        bankTwo.classList.replace('bankOptionSelected', 'bankOption');
        bankThree.classList.replace('bankOption', 'bankOptionSelected');
    }
    else if (option === 0)
    {
        selectedBank = 0;
        bankOne.classList.replace('bankOption', 'bankOptionSelected');
        bankTwo.classList.replace('bankOptionSelected', 'bankOption');
        bankThree.classList.replace('bankOptionSelected', 'bankOption');
    }
    else 
    {
        alert('Not Enough Money');
    }

}

function deposit()
{
    var stringAmount = prompt("How much do you want to deposit?", "");
    var amount = Number(stringAmount);

    if (amount > money)
    {
        alert("You don't have that much money");
    }
    else
    {
        money -= amount;
        bankMoney += amount;
        alert('deposited $' + amount);
    }
    updateData();
}

function withdraw()
{
    var stringAmount = prompt("How much do you want to withdraw?", "");
    var amount = Number(stringAmount);

    if (amount > bankMoney)
    {
        alert("You don't have that much money");
    }
    else
    {
        bankMoney -= amount;
        money += amount;
        alert('withdrew $' + amount);
    }
    updateData();
}

//BUSINESS
function createBusiness()
{
    alert('coming soon');
}