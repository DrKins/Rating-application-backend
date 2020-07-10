const sql ={
    selectall :'SELECT * FROM `reactions` WHERE company=?',
    selectbyid:'SELECT * FROM reactions WHERE id=? AND company=?',
    selectsettings:'SELECT * FROM settings WHERE company=?',
    countreaction :'SELECT COUNT(emoticon) AS output FROM reactions WHERE emoticon=? AND company=?',
    countreactionbydate:'SELECT COUNT(emoticon) AS output FROM reactions WHERE date =? AND company=?',
    getuserbyname:'SELECT * FROM users WHERE name=?', 
    insertreaction:'INSERT INTO reactions(date,emoticon,company) VALUES(?,?,?)',
    updatesettings:'UPDATE settings SET message = ? , messageDuration = ? , emoticonCount =? WHERE company=?',
    createuser:'INSERT INTO users (name, password,lvl,company) VALUES (?,?,?,?)',
    deletereaction:'DELETE FROM reactions WHERE id = ? AND company=?'
}

module.exports = sql;



/*
Novi level admina 3 master admin gotovo
register moze samo 3 za admine a 2 za usere  gotovo
register zabranit dupla imena gotovo gotovo
promjenit bazu podataka da je na insanskom jeziku aka englesh gotovo
*/