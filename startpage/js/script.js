var reminders = [];
var loadedReminders = false;

var loadReminders = setInterval(function() {
    if (!loadedReminders)
    {
        var remind = '';
        for (var i = 0; i < localStorage.reminders.length; i++)
        {
            if (localStorage.reminders[i] != '|')
            {
                remind = remind + localStorage.reminders[i];
            }
            else
            {
                placeReminder(remind);

                remind = ''
            }
        }
        placeReminder(remind);
        loadedReminders = true;
    }
}, 100)

var dateChanger = setInterval(function() {
    var dateOutput = document.getElementById('date');
    var shortDateOutput = document.getElementById('dateShort');
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    dateOutput.textContent = today;

    var date = '';
    if (mm === '01')
    {
        date = 'January'
    }
    else if (mm === '02')
    {
        date = 'February'
    }
    else if (mm === '03')
    {
        date = 'March'
    }
    else if (mm === '04')
    {
        date = 'April'
    }
    else if (mm === '05')
    {
        date = 'May'
    }
    else if (mm === '06')
    {
        date = 'June'
    }
    else if (mm === '07')
    {
        date = 'July'
    }
    else if (mm === '08')
    {
        date = 'August'
    }
    else if (mm === '09')
    {
        date = 'September'
    }
    else if (mm === '10')
    {
        date = 'October'
    }
    else if (mm === '11')
    {
        date = 'November'
    }
    else if (mm === '12')
    {
        date = 'December'
    }

    if (dd[1] === '1')
        date = date + ' ' + dd + 'st';
    else if (dd[1] === '2')
        date = date + ' ' + dd + 'nd';
    else if (dd[1] === '3')
        date = date + ' ' + dd + 'rd';
    else
        date = date + ' ' + dd + 'th';



    shortDateOutput.textContent = date;
}, 1000)

function addReminder()
{
    var reminder = '';
    var tagName = prompt('Give a tag', '');
    var reminderName = prompt('Give a title', '');
    var dueDate = prompt('Due by', '');

    if (tagName === null || tagName === '') 
    {
        return;
    }
    else
    {
        reminder = "[" + tagName + "]";
    }

    if (reminderName === null || reminderName === '') 
    {
        return;
    }
    else
    {
        reminder = reminder + reminderName;
    }

    if (dueDate === null || dueDate === '') 
    {
        return;
    }
    else
    {
        reminder = reminder + ' - ' + dueDate;
    }

    console.log(reminder);

    if (localStorage.reminders === '')
    {
        localStorage.reminders = reminder
    }
    else
    {
        localStorage.reminders = localStorage.reminders + '|' + reminder;
    }

    placeReminder(reminder);
}

function clearReminders()
{
    localStorage.reminders = '';
}

function placeReminder(name)
{
    var remindersContainer = document.getElementById('remindersContainer');
    var button = document.createElement('button');
    button.textContent = name;
    button.setAttribute('onclick', 'removeReminder("' + name + '")');
    button.setAttribute('id', name);
    button.classList.add('reminder');
    remindersContainer.appendChild(button);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setWallpaper()
{
    console.log('beep');
    var wallpaper = getRandomInt(3);
    document.body.style = "background-image: URL(src/background" + String(wallpaper+1) + ".jpg)";
}

function removeReminder(id)
{
    var confirmation = confirm(('Are you sure you want to remove: ' + id + '?'));
    if (!confirmation)
        return;


    var reminderArray = [];
    var remind = '';
    for (var i = 0; i < localStorage.reminders.length; i++)
    {
        if (localStorage.reminders[i] != '|')
        {
            remind = remind + localStorage.reminders[i];
        }
        else
        {
            reminderArray.push(remind);

            remind = ''
        }
    }
    reminderArray.push(remind);
    localStorage.reminders = '';

    reminderArray.splice(reminderArray.indexOf(id), 1);

    var remove = document.getElementById(id);
    remove.remove();


    for (var i = 0; i < reminderArray.length; i++)
    {
        if (localStorage.reminders === '')
        {
            localStorage.reminders = reminderArray[i];
        }
        else
        {
            localStorage.reminders = localStorage.reminders + '|' + reminderArray[i];
        }
    }
}

setWallpaper();